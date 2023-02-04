import React, { useContext, useEffect, useState } from 'react';
import { AboutContext } from '../pages/about';
import { menuSpeed } from '@/styles/GlobalVariables';
import styled from '@emotion/styled';

interface AboutContextType {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    info: Array<{ fact: string; title: string; body: string }>;
}

interface AboutInfoProps {
    fact?: 'default' | 'ireland' | 'jungle' | 'rocky';
}

const StyledButton = styled.button((props: { hideButton: boolean }) => ({}));

const AboutInfo: React.FC<AboutInfoProps> = () => {
    const context = useContext(AboutContext);
    if (context === null) return null;
    const { index, setIndex, info } = context as AboutContextType;

    const [hideButton, setHideButton] = useState(false);

    useEffect(() => {
        setHideButton(true);
        setTimeout(() => {
            setHideButton(false);
        }, menuSpeed);
    }, [index]);

    const FactButtons = () => {
        return (
            <>
                <StyledButton
                    onClick={() =>
                        setIndex(index === info.length - 1 ? 0 : index + 1)
                    }
                    hideButton={hideButton}
                    disabled={hideButton ? true : false}
                >
                    {index === info.length - 1
                        ? 'Back to the top'
                        : index === 0
                        ? 'Click here for some fun facts about me'
                        : 'To the next fun fact'}
                </StyledButton>
            </>
        );
    };

    return (
        <>
            <h2>{info[index].title}</h2>
            <p>{info[index].body}</p>
            <FactButtons />
        </>
    );
};

export default AboutInfo;
