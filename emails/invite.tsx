import React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const TeamInviteEmail = ({
    inviterName = "Sarah Chen",
    teamName = "Design Team",
    inviteLink = "https://app.example.com/invite/12345",
    companyName = "Acme Inc",
    role = "Designer"
}) => {
    const previewText = `${inviterName} has invited you to join ${teamName} on ${companyName}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logoContainer}>
                        <img
                            src={`${baseUrl}/static/logo.png`}
                            width="42"
                            height="42"
                            alt={companyName}
                            style={logo}
                        />
                    </Section>

                    {/* Main Content */}
                    <Section style={content}>
                        <Heading style={h1}>Join the team</Heading>

                        <Text style={text}>
                            Hi there,
                        </Text>

                        <Text style={text}>
                            <strong>{inviterName}</strong> has invited you to join the <strong>{teamName}</strong> as
                            a <strong>{role}</strong> on {companyName}. Click the button below to join the team
                            and get started.
                        </Text>

                        {/* CTA Button */}
                        <Section style={buttonContainer}>
                            <Button style={button} href={inviteLink}>
                                Accept Invitation
                            </Button>
                        </Section>

                        <Text style={text}>
                            Or copy and paste this URL into your browser:{' '}
                            <Link href={inviteLink} style={link}>
                                {inviteLink}
                            </Link>
                        </Text>

                        {/* Additional Info */}
                        <Text style={text}>
                            This invitation will expire in 7 days. If you don't have an account,
                            you'll be prompted to create one.
                        </Text>

                        {/* Footer */}
                        <Text style={footer}>
                            If you weren't expecting this invitation, you can ignore this email. If you have
                            any questions, feel free to <Link href="mailto:support@example.com" style={link}>contact our support team</Link>.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    maxWidth: '580px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const logoContainer = {
    padding: '20px 30px',
};

const logo = {
    margin: '0 auto',
    display: 'block',
};

const content = {
    padding: '0 30px',
};

const h1 = {
    color: '#1f2937',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.25',
    margin: '16px 0',
};

const text = {
    color: '#4b5563',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '16px 0',
};

const buttonContainer = {
    margin: '24px 0',
};

const button = {
    backgroundColor: '#5850ec',
    borderRadius: '5px',
    color: '#fff',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '100%',
    padding: '14px 24px',
    textDecoration: 'none',
    cursor: 'pointer',
};

const link = {
    color: '#5850ec',
    textDecoration: 'underline',
};

const footer = {
    color: '#6b7280',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '32px 0 0',
};

export default TeamInviteEmail;