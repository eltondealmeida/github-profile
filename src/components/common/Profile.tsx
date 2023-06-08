import { useEffect, useState } from "react";
import { Card, Col, ListGroup, Nav, Row, Tab } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { User } from "../../types/User";
import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export function Profile(): JSX.Element {
  const { watch } = useFormContext<User>();

  const avatarUrl = watch("avatarUrl");
  const reposUrl = watch("reposUrl");
  const starredUrl = watch("starredUrl");

  return (
    <Row className="m-4">
      <Col xs={12} lg={3}>
        <ProfileImage src={avatarUrl} alt="User Avatar" />
        <div>
          <h5 className="fw-bold mt-2">{watch("name")}</h5>
          <a href={watch("blog")} />
        </div>
      </Col>
      <Col xs={12} lg={9}>
        <ListGroup variant="flush">
          <ListGroup.Item></ListGroup.Item>
          <ListGroup.Item>
            <strong>Location:</strong> {watch("location")}
          </ListGroup.Item>
          {/* Adicione outros campos de dados pessoais aqui */}
        </ListGroup>
        <Tab.Container defaultActiveKey="repositories">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="repositories">Repositories</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="starred">Starred</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="repositories">
              {/* Renderize a lista de repositórios aqui */}
            </Tab.Pane>
            <Tab.Pane eventKey="starred">
              {/* Renderize a lista de starred aqui */}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Col>
    </Row>
  );
}
