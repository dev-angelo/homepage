import React from "react";
// Theme
import GlobalTheme from "lib/context/GlobalTheme";
// Components
import { Footer, TeamGlobalNavigationBar } from "components";
import {
  TeamIntroduce,
  TeamCulture,
  TeamInterview,
  Welfare,
  RecruitLink,
} from "pageComponents/team-culture";

const TeamCulturePage = () => {
  return (
    <GlobalTheme>
      <main style={{ overflowX: "hidden" }}>
        <TeamGlobalNavigationBar />
        <TeamIntroduce />
        <TeamCulture />
        <TeamInterview />
        <Welfare />
        <RecruitLink />
        <Footer />
      </main>
    </GlobalTheme>
  );
};

export default TeamCulturePage;
