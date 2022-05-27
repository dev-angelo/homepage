import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
// Components
import { BannerPopup } from "components";
// Utils
import { strainMdxInfo } from "lib/utils";

const Banner: React.FC = () => {
  const { title, description } = strainMdxInfo(useStaticQuery(BannerQuery));
  const bannerCookie = Boolean(document.cookie.match("ignoreBanner"));

  const [bannerStatus, setBannerStatus] = React.useState(title && !bannerCookie);

  const closeHandler = () => {
    const oneDayMs = 86400;
    document.cookie = `name=ignoreBanner; value=true; max-age=${oneDayMs}`;

    setBannerStatus(false);
  };

  return (
    <BannerWrapper {...{ bannerStatus }}>
      <BannerPopup {...{ title, description, onCloseButtonClicked: closeHandler }} />
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div<{ bannerStatus?: boolean }>`
  display: ${({ bannerStatus }) => (bannerStatus ? "block" : "none")};
  position: fixed;
  bottom: 0;
  z-index: 10;
`;

const BannerQuery = graphql`
  query BannerQuery {
    mdx(frontmatter: { templateKey: { eq: "main_banner" } }) {
      frontmatter {
        title
        description
      }
    }
  }
`;

export default Banner;
