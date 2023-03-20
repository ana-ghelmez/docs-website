import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import VisibilitySensor from 'react-visibility-sensor';
import { animated, useTrail } from 'react-spring';

import { Icon } from '@newrelic/gatsby-theme-newrelic';

export const FeaturedContent = ({
  alt,
  children,
  lineIcon,
  lineIconOnly,
  img,
  list,
  offset = 0,
  subTitle,
  text,
  title,
}) => {
  const [isVisible, setVisible] = useState(false);

  const updateVisibility = (isVisible) => {
    if (isVisible) {
      setVisible(true);
    }
  };

  const spring = useTrail(6, {
    config: { mass: 1, tension: 400, friction: 40 },
    from: {
      opacity: 0,
      y: '6%',
    },
    to: {
      opacity: isVisible ? 1 : 0,
      y: isVisible ? '0%' : '6%',
    },
  });

  return (
    <VisibilitySensor
      onChange={updateVisibility}
      partialVisibility={offset && true}
      offset={{ bottom: offset }}
    >
      <Container>
        {!lineIconOnly && (
          <>
            <TextContainer separator={title}>
              {title && <Title>{title}</Title>}
              {subTitle && (
                <SubTitle as={animated.h2} style={spring[1]}>
                  {subTitle}
                </SubTitle>
              )}
              {text && text.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              {list && (
                <ListWrapper>
                  {list.map((item, i) => (
                    <ListItem key={i} as={animated.div} style={spring[3 + i]}>
                      <Icon
                        name="fe-check"
                        css={css`
                          margin-right: 8px;
                          width: 36px;
                        `}
                      />
                      <li>{item}</li>
                    </ListItem>
                  ))}
                </ListWrapper>
              )}
            </TextContainer>
            {img && (
              <ImageWrapper
                separator={title}
                as={animated.div}
                style={spring[2]}
              >
                <img alt={alt} src={img} />
              </ImageWrapper>
            )}
          </>
        )}
        {lineIcon && (
          <>
            <Spacer>
              <LineIconWrapper as={animated.div} style={spring[0]}>
                <LineIcon
                  name={lineIcon}
                  css={css`
                    width: 36px;
                  `}
                />
              </LineIconWrapper>
            </Spacer>
            {children}
          </>
        )}
      </Container>
    </VisibilitySensor>
  );
};

const Container = styled.div`
cubic-bezier(0, 0.3, 0.4, 1);
display: flex;
margin: 48px 0;
padding: 0 40px;
position: relative;
width: 100%;

&.no-animate {
  opacity: 1;
}

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    margin-top: 0;
    padding: 0;
  }
`;

const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  ${(p) => p.separator && `padding-left: 32px`};
  width: 30%;

  img {
    object-fit: contain;
    width: 100%;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const LineIcon = styled(Icon)`
  color: var(--secondary-text-color);
  height: 33px;
  width: 33px;
`;

const LineIconWrapper = styled.div`
  align-items: center;
  background: var(--primary-background-color);
  border: 4px solid var(--secondary-text-color);
  display: flex;
  justify-content: center;
  padding: 8px;
`;

const ListItem = styled.li`
  align-items: center;
  display: flex;
  margin-bottom: 16px;
`;

const ListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SubTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 32px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px 0;
  padding-right: ${(p) => (p.separator ? `32px` : `16px`)};
  width: 66%;

  @media screen and (max-width: 1000px) {
    border: 0;
    padding: 0;
    width: 100%;
  }
`;

const Spacer = styled.div`
  align-items: center;
  background: var(--primary-background-color);
  display: flex;
  justify-content: center;
  left: -52px;
  padding: 12px;
  position: absolute;
  top: 40%;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 44px;

  @media screen and (max-width: 1000px) {
    font-size: 32px;
  }
`;
