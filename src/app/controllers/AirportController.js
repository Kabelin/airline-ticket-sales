import { Op } from 'sequelize';
import Airport from '../models/Airport';

class AirportController {
  async index(req, res) {
    const airports = await Airport.findAll({
      attributes: [
        'id',
        'name',
        'zip_code',
        'city',
        'federal_unity',
        'connections',
      ],
    });

    return res.json(airports);
  }

  async indexByOrigin(req, res) {
    const { city, federal_unity } = req.query;

    if (!(city || federal_unity))
      return res.status(401).json({
        error: 'City and federal unity not found. Submit at least one of them.',
      });

    const airports = await Airport.findAll({
      where: { [Op.or]: [{ city }, { federal_unity }] },
      attributes: [
        'id',
        'name',
        'zip_code',
        'city',
        'federal_unity',
        'connections',
      ],
    });

    return res.json(airports);
  }
}

export default new AirportController();
