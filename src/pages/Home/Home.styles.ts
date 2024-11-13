import styled from "styled-components";

export const ToolBar = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #f8f9fa;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    position: fixed;
    width: 100%;
    z-index: 100;
    place-content: center;
    
    @media (max-width: 768px) {
        padding: 10px 0px;
    }
`;