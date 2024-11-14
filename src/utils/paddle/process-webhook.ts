import db from '@/db';
import { Pricing, Users } from '@/db/schema/schema';
import {
  CustomerCreatedEvent,
  CustomerUpdatedEvent,
  SubscriptionCreatedEvent,
  SubscriptionUpdatedEvent,
} from '@paddle/paddle-node-sdk';
import { and, eq } from 'drizzle-orm';

export class ProcessWebhook {
  async processEvent(eventData: any) {
    console.log(eventData.event_type);
    const eventName = eventData.event_type;
    switch (eventName) {
      case 'customer.created':
     
      case 'customer.updated':
        await this.updateCustomerData(eventData);
        break;
      case 'subscription.created':
        await this.createSubscriptionData(eventData);
        break;
      case 'subscription.updated':
        await this.updateSubscriptionData(eventData);
        break;
      default:
        console.log(eventData.event_type);
    }
  }

  private async createSubscriptionData(eventData: any) {
    await db.transaction(async (tx) => {
      try {
        // Set all previous active subscriptions for this customer to inactive
        await tx.update(Pricing).set({ status: 'inactive' }).where(and(
          eq(Pricing.customerId, eventData.data.customer_id),
          eq(Pricing.status, 'active')
        ));

        // Insert a new record with the subscription details
        const response = await tx.insert(Pricing).values({
          subscriptionId: eventData.data.id,
          priceId: eventData.data.items[0].price.id,
          customerId: eventData.data.customer_id,
          email: '',
          endDate: new Date(eventData.data.next_billed_at),
          nextBillDate: new Date(eventData.data.next_billed_at),
          amount: eventData.data.items[0].price.unit_price.amount.slice(0, -2),
          status: 'active',  // Set the new subscription as active
          paymentMethod: eventData.data.items[0].price.id,
          startDate: new Date(eventData.data.started_at),
          totalAssessments:
            eventData.data.items[0].price.id === 'pri_01jc3hgpynvy9ac71829kq23t9' ? 30 :
            eventData.data.items[0].price.id === 'pri_01jc3hehprwp718k0f247dpwqd' ? 30 : 1,
          totalCandidates: 0,
          userId: eventData.data.custom_data.userId,
        }).returning({ id: Pricing.id });

        console.log(response);
      } catch (e) {
        console.error(e);
        throw e; // This will trigger the transaction to rollback
      }
    });
  }

  private async updateSubscriptionData(eventData:any) {
    await db.transaction(async (tx) => {
      try {
        const response = await tx.update(Pricing).set({
          nextBillDate: new Date(eventData.data!.next_billed_at),
          amount: eventData!.data!.items?.[0]!.price!.unit_price!.amount!.slice(0, -2),
          endDate: new Date(eventData!.data!.next_billed_at!),
          priceId: eventData.data.items[0]!.price.id,
          totalAssessments:
            eventData!.data!.items![0]!.price.id === 'pri_01jc3hgpynvy9ac71829kq23t9' ? 30 :
            eventData!.data!.items![0]!.price.id === 'pri_01jc3hehprwp718k0f247dpwqd' ? 30 : 1,
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
