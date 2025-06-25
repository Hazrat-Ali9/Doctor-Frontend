import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Card, Row, Col, ListGroup, ProgressBar } from 'react-bootstrap';

const AdminHome = () => {
  const { bio, setting, reviews, appointments } = useContext(AppContext);

  // Ensure appointments is an array
  const appointmentsArray = Array.isArray(appointments) ? appointments : [];

  // Count appointment statuses
  const pendingCount = appointmentsArray.filter(a => a.status === 'pending').length;
  const progressCount = appointmentsArray.filter(a => a.status === 'progress').length;
  const completedCount = appointmentsArray.filter(a => a.status === 'completed').length;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Doctor Information</Card.Title>
              <Card.Text>
                <strong>Dr. {bio?.name || 'N/A'}</strong>
              </Card.Text>
              <p>Email: {setting?.email || 'N/A'}</p>
              <p>Contact: {setting?.contactNumber || 'N/A'}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Latest Review</Card.Title>
              <p><strong>Patient:</strong> {reviews?.reviews?.[0]?.patientName || 'No Reviews Yet'}</p>
              <p><strong>Rating:</strong> {reviews?.reviews?.[0]?.rating || 'No Rating'}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Appointment Summary</Card.Title>
              <p><strong>Pending:</strong> {pendingCount}</p>
              <p><strong>In Progress:</strong> {progressCount}</p>
              <p><strong>Completed:</strong> {completedCount}</p>
              <ProgressBar className="mt-3">
                <ProgressBar now={pendingCount} label={`${pendingCount}`} key={1} variant="warning" />
                <ProgressBar now={progressCount} label={`${progressCount}`} key={2} variant="info" />
                <ProgressBar now={completedCount} label={`${completedCount}`} key={3} variant="success" />
              </ProgressBar>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Pending Appointment Patient List</Card.Title>
              {pendingCount > 0 ? (
                <ListGroup variant="flush">
                  {appointmentsArray.filter(a => a.status === 'pending').map((a, index) => (
                    <ListGroup.Item key={index}>{a.name || 'Unnamed Appointment'}</ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">No pending appointments available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminHome;
