import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  verifyLink: string;
  userEmail: string;
}

export const VerifyEmailTemplate = ({ verifyLink, userEmail }: VerifyEmailProps) => {
  const containerStyle = {
    margin: "0 auto",
    padding: "1.5rem",
    marginTop: "1.25rem",
    marginBottom: "3rem",
    background: "#f9f9f9",
    borderRadius: "8px",
    maxWidth: "600px",
  };

  const hrStyle = {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    border: "0",
    height: "1px",
    background: "#ddd",
  };

  const textStyle = {
    fontSize: "1rem",
    margin: "0.5rem 0",
    lineHeight: "1.5",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    background: "#0070f3",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "1rem",
    marginTop: "1.5rem",
  };

  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", background: "#f4f4f4", padding: "2rem" }}>
        <Container style={containerStyle}>
          <Text style={{ ...textStyle, fontWeight: "bold", fontSize: "1.25rem" }}>
            Verify Your Email Address
          </Text>
          <Hr style={hrStyle} />
          <Text style={textStyle}>
            Hello, we received a request to verify your email address: <strong>{userEmail}</strong>.
          </Text>
          <Text style={textStyle}>
            To complete the verification process, please click the button below:
          </Text>
          <a href={verifyLink} style={buttonStyle} target="_blank" rel="noopener noreferrer">
            Verify Email
          </a>
          <Hr style={hrStyle} />
          <Text style={textStyle}>
            If you did not request this, please ignore this email or contact support.
          </Text>
          <Text style={textStyle}>Thank you,</Text>
          <Text style={{ ...textStyle, fontStyle: "italic" }}>The Eimaam Dev Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

