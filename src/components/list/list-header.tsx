import {Header} from "./styles";
import {Button, Heading} from "@primer/react";
import {Link} from "react-router-dom";

interface ListHeaderProps {
    title: string
    buttonHref: string
    buttonTitle: string
}

function ListHeader({ title, buttonHref, buttonTitle }: ListHeaderProps) {
    return (
        <Header>
            <Heading sx={{ fontSize: "1.5rem", fontWeight: "normal" }}>{title}</Heading>

            <Button variant={"primary"} as={Link} to={buttonHref}>
                {buttonTitle}
            </Button>
        </Header>
    )
}

export { ListHeader }