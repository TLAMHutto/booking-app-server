export const showMessage = (req, res) => {
    res.send(`Here is your message ${req.params.message}`);
}