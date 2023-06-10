import { Card, Col, Collapse } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { User } from "../../types/User";
import styled, { css } from "styled-components";
import {
  BsChevronDown,
  BsChevronUp,
  BsPaperclip,
  BsBuilding,
  BsGeoAlt,
} from "react-icons/bs";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  AdditionalInfoCard,
  AdditionalInfoContent,
  AdditionalInfoToggle,
  AdditionalInfoToggleText,
  AdditionalLinksContainer,
  ChevronIcon,
  ProfileBio,
  ProfileImage,
  ProfileLink,
  ProfileLinkContainer,
  ProfileLinkIcon,
  ProfileLinkWrapper,
  ProfileName,
} from "../styled/styledComponents";

export function Profile(): JSX.Element {
  const { watch } = useFormContext<User>();

  const avatarUrl = watch("avatarUrl");
  const name = watch("name");
  const bio = watch("bio");
  const company = watch("company");
  const location = watch("location");
  const blog = watch("blog");

  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const toggleAdditionalInfo = () => {
    setIsAdditionalInfoOpen(!isAdditionalInfoOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isDesktop) {
        setIsAdditionalInfoOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesktop]);

  const StyledCol = styled(Col)`
    ${isDesktop &&
    css`
      text-align: center;
    `}
  `;

  return (
    <StyledCol md="4" className={isDesktop ? "ms-5" : ""}>
      <ProfileImage src={avatarUrl} alt="User Avatar" />
      <div>
        <ProfileName>{name}</ProfileName>
        <ProfileBio>{bio}</ProfileBio>

        {(company || location || blog) && (
          <AdditionalInfoToggle onClick={toggleAdditionalInfo}>
            <AdditionalInfoToggleText>
              Additional Information
            </AdditionalInfoToggleText>
            <ChevronIcon>
              {isAdditionalInfoOpen ? <BsChevronUp /> : <BsChevronDown />}
            </ChevronIcon>
          </AdditionalInfoToggle>
        )}

        <AdditionalInfoContent>
          <Collapse in={isAdditionalInfoOpen}>
            <AdditionalInfoCard bg="light">
              <Card.Body>
                {company && (
                  <ProfileLinkWrapper>
                    <ProfileLinkContainer>
                      <ProfileLinkIcon>
                        <BsBuilding />
                      </ProfileLinkIcon>
                      <ProfileLink>{company}</ProfileLink>
                    </ProfileLinkContainer>
                  </ProfileLinkWrapper>
                )}
                {location && (
                  <ProfileLinkWrapper>
                    <ProfileLinkContainer>
                      <ProfileLinkIcon>
                        <BsGeoAlt />
                      </ProfileLinkIcon>
                      <ProfileLink>{location}</ProfileLink>
                    </ProfileLinkContainer>
                  </ProfileLinkWrapper>
                )}
                {blog && (
                  <ProfileLinkWrapper>
                    <ProfileLinkContainer>
                      <ProfileLinkIcon>
                        <BsPaperclip />
                      </ProfileLinkIcon>
                      <ProfileLink href={blog}>{blog}</ProfileLink>
                    </ProfileLinkContainer>
                  </ProfileLinkWrapper>
                )}
              </Card.Body>
            </AdditionalInfoCard>
          </Collapse>
        </AdditionalInfoContent>
      </div>
      <AdditionalLinksContainer>
        {company && (
          <ProfileLinkWrapper>
            <ProfileLinkContainer>
              <ProfileLinkIcon>
                <BsBuilding />
              </ProfileLinkIcon>
              <ProfileLink>{company}</ProfileLink>
            </ProfileLinkContainer>
          </ProfileLinkWrapper>
        )}
        {location && (
          <ProfileLinkWrapper>
            <ProfileLinkContainer>
              <ProfileLinkIcon>
                <BsGeoAlt />
              </ProfileLinkIcon>
              <ProfileLink>{location}</ProfileLink>
            </ProfileLinkContainer>
          </ProfileLinkWrapper>
        )}
        {blog && (
          <ProfileLinkWrapper>
            <ProfileLinkContainer>
              <ProfileLinkIcon>
                <BsPaperclip />
              </ProfileLinkIcon>
              <ProfileLink href={blog}>{blog}</ProfileLink>
            </ProfileLinkContainer>
          </ProfileLinkWrapper>
        )}
      </AdditionalLinksContainer>
    </StyledCol>
  );
}
