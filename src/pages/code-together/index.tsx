import React from "react";
// Theme
import GlobalTheme from "lib/context/GlobalTheme";
// Components
import { HomeGlobalNavigationBar, Footer } from "components/";
import { Masthead, Feature, Course } from "pageComponents/code-together";

const CodeTogetherPage: React.FC = () => {
  return (
    <GlobalTheme>
      <main style={{ overflowX: "hidden" }}>
        <HomeGlobalNavigationBar />
        <Masthead />
        <Feature />
        <Course />
        <Footer />
      </main>
    </GlobalTheme>
  );
};

export default CodeTogetherPage;
