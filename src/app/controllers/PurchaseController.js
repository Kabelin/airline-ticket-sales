import Purchase from '../models/Purchase';
import Flight from '../models/Flight';

class PurchaseController {
  async index(req, res) {
    const purchases = await Purchase.findAll();

    return res.json(purchases);
  }

  async create(req, res) {
    const { flight_id, seats } = req.body;
    const { userId: user_id } = req;

    const flight = await Flight.findOne({ where: { id: flight_id } });

    if (!flight) return res.status(404).json({ error: 'Flight not found.' });

    if (flight.remaining_seats.length < seats.length)
      return res
        .status(401)
        .json({ error: 'Number of desired seats unavailable.' });

    const remaining_seats = [...flight.remaining_seats];
    for (let i = 0; i < seats.length; i += 1) {
      const seatIndex = remaining_seats.findIndex(
        (seat) => seat.name === seats[i].name
      );

      if (seatIndex === -1)
        return res
          .status(401)
          .json({ error: `Seat ${seats[i].name} unavailable.` });

      remaining_seats.splice(seatIndex, 1);
    }

    const value = flight.value * seats.length;

    const t = await Purchase.sequelize.transaction();

    try {
      await flight.update({ remaining_seats }, { transaction: t });

      const purchase = await Purchase.create(
        {
          seats,
          value,
          user_id,
          flight_id,
        },
        { transaction: t }
      );

      await t.commit();

      return res.json(purchase);
    } catch (error) {
      await t.rollback();

      return res
        .status(500)
        .json({ error: 'Server could not save purchase. Try again later.' });
    }
  }
}

export default new PurchaseController();
