import { Card } from "react-bootstrap";
import styled from "styled-components";

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-bottom: 10px;
`;

export const ProfileName = styled.h5`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 5px;
  text-align: center;
`;

export const ProfileBio = styled.h6`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 10px;
`;

export const ProfileLinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const ProfileLinkIcon = styled.span`
  margin-right: 5px;
  color: #0587ff;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
`;

export const ProfileLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #0587ff;
  overflow-wrap: break-word;
  max-width: 100%;
`;

export const AdditionalInfoContent = styled.div`
  margin-top: 20px;
`;

export const AdditionalInfoToggle = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  color: #0587ff;
  font-size: 14px;
  flex-direction: column;
  @media (min-width: 992px) {
    display: none;
  }
`;

export const AdditionalInfoToggleText = styled.span`
  margin-bottom: 3px;
`;

export const ChevronIcon = styled.span`
  margin-left: 5px;
`;

export const AdditionalInfoCard = styled(Card)`
  margin-top: 10px;
  @media (max-width: 991px) {
    padding: 10px;
    border: none;
    box-shadow: none;
  }
`;

export const ProfileLinkWrapper = styled.div`
  position: relative;
`;

export const AdditionalLinksContainer = styled.div`
  display: none;
  @media (min-width: 992px) {
    display: block;
  }
`;
