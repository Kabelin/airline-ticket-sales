import { Op } from 'sequelize';
import Flight from '../models/Flight';
import Airport from '../models/Airport';

class FlightController {
  async index(req, res) {
    const flights = await Flight.findAll({
      attributes: [
        'id',
        'date',
        'remaining_seats',
        'quantity_available',
        'value',
      ],
      include: [
        {
          model: Airport,
          as: 'origin',
          attributes: ['id', 'name', 'zip_code', 'city', 'federal_unity'],
        },
        {
          model: Airport,
          as: 'destination',
          attributes: ['id', 'name', 'zip_code', 'city', 'federal_unity'],
        },
      ],
    });

    return res.json(flights);
  }

  async search(req, res) {
    const { origin, destination, quantity } = req.body;

    if (!(origin.city || origin.federal_unity))
      return res.status(401).json({
        error:
          'Origin city and federal unity not found. Submit at least one of them',
      });

    if (!(destination.city || destination.federal_unity))
      return res.status(401).json({
        error:
          'Destination city and federal unity not found. Submit at least one of them',
      });

    if (!quantity)
      return res.status(401).json({
        error: 'Number of seats desired must be provided and greater than 0.',
      });

    const flights = await Flight.findAll({
      where: {
        quantity_available: {
          [Op.gte]: quantity,
        },
      },
      attributes: ['id', 'date', 'remaining_seats', 'value'],
      include: [
        {
          model: Airport,
          as: 'origin',
          attributes: ['id', 'name', 'zip_code', 'city', 'federal_unity'],
          where: {
            [Op.or]: [
              { city: origin.city || '' },
              { federal_unity: origin.federal_unity || '' },
            ],
          },
        },
        {
          model: Airport,
          as: 'destination',
          attributes: ['id', 'name', 'zip_code', 'city', 'federal_unity'],
          where: {
            [Op.or]: [
              { city: destination.city || '' },
              { federal_unity: destination.federal_unity || '' },
            ],
          },
        },
      ],
    });

    return res.json(flights);
  }
}

export default new FlightController();
