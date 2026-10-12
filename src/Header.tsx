interface HeaderProps {
    title?: string;
}

export function Header(props: HeaderProps) {
    const { title } = props;
    return (
        <header>
            <h1>{title}</h1>
            <p>перший FrontEnd</p>
        </header>
    )
}