import React from "react";
import styled from "styled-components";

const withStyle = (style: String) => (
  WrappedComponent: React.FunctionComponent<any>
) => {
  return (props) => {
    const StyledComponent: any = styled.div`
      ${style}
    `;

    return (
      <StyledComponent>
        <WrappedComponent {...props} />
      </StyledComponent>
    );
  };
};

export default withStyle;
