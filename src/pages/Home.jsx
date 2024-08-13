import React from 'react';
import { MainLayout } from '../layout/MainLayout';
import styled from 'styled-components';
import { Button, Col, Container, Row } from 'react-bootstrap';

const HeroSection = styled.section`
  background-color: #f8f9fa;
  padding: 50px 0;
  text-align: center;
`;

const FeaturesSection = styled.section`
  padding: 50px 0;
  background-color: #fff;
`;

const FeatureCard = styled.div`
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  text-align: center;
  background-color: #ffffff;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Home = () => {
  return (
    <>
      <MainLayout>
        <HeroSection>
          <Container>
            <h1>Welcome to Task Manager</h1>
            <p>
              Efficiently manage your tasks with our simple and intuitive task
              management system.
            </p>
            <Button variant="primary" href="/tasks">
              Get Started
            </Button>
          </Container>
        </HeroSection>

        <FeaturesSection>
          <Container>
            <h2 className="text-center mb-4">Features</h2>
            <Row>
              <Col md={4}>
                <FeatureCard>
                  <h3>Create Tasks</h3>
                  <p>Easily create and manage your tasks with a few clicks.</p>
                </FeatureCard>
              </Col>
              <Col md={4}>
                <FeatureCard>
                  <h3>Organize</h3>
                  <p>
                    Organize tasks into categories and prioritize your workload.
                  </p>
                </FeatureCard>
              </Col>
              <Col md={4}>
                <FeatureCard>
                  <h3>Track Progress</h3>
                  <p>
                    Track your progress and stay on top of your task management.
                  </p>
                </FeatureCard>
              </Col>
            </Row>
          </Container>
        </FeaturesSection>
      </MainLayout>
    </>
  );
};

export default Home;
