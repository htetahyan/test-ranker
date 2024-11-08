import db from '@/db';
import { Pricing, Users } from '@/db/schema/schema';
import {
  CustomerCreatedEvent,
  CustomerUpdatedEvent,
  EventEntity,
  EventName,
  SubscriptionCreatedEvent,
  SubscriptionUpdatedEvent,
} from '@paddle/paddle-node-sdk';
import { and, eq } from 'drizzle-orm';

export class ProcessWebhook {
  async processEvent(eventData: EventEntity) {
    switch (eventData.eventType) {
      case EventName.SubscriptionCreated:
        await this.createSubscriptionData(eventData);
        break;
      case EventName.SubscriptionUpdated:
        await this.updateSubscriptionData(eventData);
        break;
      case EventName.CustomerCreated:
      case EventName.CustomerUpdated:
        await this.updateCustomerData(eventData);
        break;
    }
  }

  private async createSubscriptionData(eventData: SubscriptionCreatedEvent | SubscriptionUpdatedEvent) {
    await db.transaction(async (tx) => {
      try {
        const response = await tx.insert(Pricing).values({
            subscriptionId: eventData?.data?.id,
          priceId: eventData.data.items[0].price?.id,
          customerId: eventData.data.customerId,
          email: '',
          endDate: new Date(eventData.data.nextBilledAt!),
          nextBillDate: new Date(eventData.data.nextBilledAt!),
          amount: eventData.data.items[0].price?.unitPrice?.amount,
          status: eventData.data.status,
          paymentMethod: eventData.data.items[0].price?.id,
          startDate: new Date(eventData.data.startedAt!),
          totalAssessments:
            eventData.data.items[0].price?.id === 'pri_01jc3hgpynvy9ac71829kq23t9' ? 30 :
            eventData.data.items[0].price?.id === 'pri_01jc3hehprwp718k0f247dpwqd' ? 30 : 1,
          totalCandidates: 0,
          userId: eventData.data.customerId,
        }).returning({ id: Pricing.id });

        console.log(response);
      } catch (e) {
        console.error(e);
        throw e; // This will trigger the transaction to rollback
      }
    });
  }

  private async updateSubscriptionData(eventData: SubscriptionCreatedEvent | SubscriptionUpdatedEvent) {
    await db.transaction(async (tx) => {
      try {
        const response = await tx.update(Pricing).set({
          nextBillDate: new Date(eventData.data.nextBilledAt!),
          amount: eventData.data.items[0].price?.unitPrice?.amount,
          endDate: new Date(eventData.data.nextBilledAt!),
          priceId: eventData.data.items[0].price?.id,
          totalAssessments:
            eventData.data.items[0].price?.id === 'pri_01jc3hgpynvy9ac71829kq23t9' ? 30 :
            eventData.data.items[0].price?.id === 'pri_01jc3hehprwp718k0f247dpwqd' ? 30 : 1,
          totalCandidates: 0,
        }).where(eq(Pricing.subscriptionId, eventData.data.id));

        console.log(response);
      } catch (e) {
        console.error(e);
        throw e; // This will trigger the transaction to rollback
      }
    });
  }

  private async updateCustomerData(eventData: CustomerCreatedEvent | CustomerUpdatedEvent) {
    await db.transaction(async (tx) => {
      try {
        const user = await tx.select().from(Users).where(eq(Users.email, eventData.data.email));

        if (user.length) {
          const response = await tx.update(Pricing).set({
            userId: user[0].id,
            email: eventData.data.email,
          }).where(and(eq(Pricing.customerId, eventData.data.id), eq(Pricing.email, eventData.data.email)));

          console.log(response);
        }
      } catch (e) {
        console.error(e);
        throw e; // This will trigger the transaction to rollback
      }
    });
  }
}
