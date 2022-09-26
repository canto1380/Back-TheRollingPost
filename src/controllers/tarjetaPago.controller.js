import TarjetaPago from "../models/tarjetaPago";

const tarjetaPago = {}

tarjetaPago.nuevaTarjeta = async(req, res) => {
    try {
        const agregaTarjeta = await buscarTarjeta(req.body.nroTarjeta)
        if(agregaTarjeta !== null) {
            res.status(400).json({ mensaje: 'Ya existe la tarjeta ingresada' })
        } else {
            const tarjeta = new TarjetaPago(req.body)
            await tarjeta.save()
            res.status(201).json(tarjeta)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const buscarTarjeta = async(tarjeta) => {
    const controlTarjeta = await TarjetaPago.findOne({
        nroTarjeta: tarjeta,
    })
    return controlTarjeta
}

tarjetaPago.listarTarjetasPorCuenta = async(req, res) => {
    try {
        const { email = '' } = req.query
        const tarjetas = await TarjetaPago.find({email})
        res.status(200).json(tarjetas)
    } catch (error) {
        res.status(404).json({ mensaje: "Error al listar las tarjetas" });
    }
}

tarjetaPago.eliminarTarjeta = async(req, res) => {
    try {
        const {id} = req.params
        await TarjetaPago.findByIdAndDelete(id)
        res.status(200).json({ mensaje: 'Tarjeta eliminada' })
    } catch (error) {
        res.status(400).json({ mensaje: 'No se pudo eliminar la tarjeta' })
    }
}

export default tarjetaPago