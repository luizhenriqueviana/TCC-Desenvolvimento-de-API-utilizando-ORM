import Order from '../models/Order';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import { Op } from 'sequelize';
import { isAfter, parseISO } from 'date-fns';
import * as Yup from 'yup';

class DeliveriesController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const deliveries = await Order.findAll({
      where: {
        deliveryman_id: req.params.deliverymanId,
        end_date: {
          [Op.not]: null,
        },
      },
      attributes: [
        'id',
        'product_name',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'avatar_id', 'email'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const order = await Order.findByPk(req.params.orderId);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    const { end_date } = req.body;
    const endDate = parseISO(end_date);

    const isAfterStartDate = isAfter(endDate, order.start_date);

    if (!isAfterStartDate) {
      return res
        .status(400)
        .json({ error: 'End date must be after start date' });
    }

    const isCanceled = order.canceled_at;

    if (isCanceled) {
      return res
        .status(400)
        .json({ error: 'Cannot delivery. This order is already canceled' });
    }
    order.end_date = end_date;

    await order.save();

    return res.json({
      order,
    });
  }
}

export default new DeliveriesController();
