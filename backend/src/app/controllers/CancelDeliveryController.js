import Order from '../models/Order';
import { isAfter, parseISO } from 'date-fns';
import * as Yup from 'yup';

class CancelDeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      canceled_at: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const order = await Order.findByPk(req.params.orderId);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    const { canceled_at } = req.body;
    const canceledDate = parseISO(canceled_at);

    const isAfterStartDate = isAfter(canceledDate, order.start_date);

    if (!isAfterStartDate) {
      return res
        .status(400)
        .json({ error: 'Canceled Date must be after start date' });
    }

    const isEndDate = order.end_date;

    if (isEndDate) {
      return res.status(400).json({ error: 'Order is Already deliveried' });
    }

    const isCanceled = order.canceled_at;

    if (isCanceled) {
      return res.status(400).json({ error: 'Delivery already canceled' });
    }

    order.canceled_at = canceled_at;

    await order.save();

    return res.json({
      order,
    });
  }
}

export default new CancelDeliveryController();
