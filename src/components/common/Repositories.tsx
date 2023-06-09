import { Card, Col, Collapse, Row } from "react-bootstrap";
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

export function Repositories(): JSX.Element {
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

  return <div>Repo</div>;
}
