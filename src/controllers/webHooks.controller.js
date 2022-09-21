
const webHooksController = {};

webHooksController.pago = async (req, res) => {
  try {
    console.log(req.body)
    res.status(200).send('OK')
  } catch (errr) {
    console.log(errr);
  }
};

export default webHooksController;
