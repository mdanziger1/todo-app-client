export default (prop) => {
    /* console.log("show error") */
    return <>
        <div style={styleOverlay()} id="overlay">{prop.message}</div>
    </>
}

function styleOverlay() {
    return {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        color: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
        zIndex: 9999,
        transition: "opacity 2s, visibility 2s",
    }
};