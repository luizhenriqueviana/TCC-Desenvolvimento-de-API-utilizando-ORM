import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Order from '../pages/Order';
import Deliveryman from '../pages/Deliveryman';
import Recipient from '../pages/Recipient';

import DeliverymanRegister from '~/pages/Deliveryman/Register';
import RecipientRegister from '~/pages/Recipient/Register';
import OrderRegister from '~/pages/Order/Register';

import DeliverymanEdit from '~/pages/Deliveryman/Edit';
import RecipientEdit from '~/pages/Recipient/Edit';
import OrderEdit from '~/pages/Order/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/order" exact component={Order} isPrivate />
      <Route path="/order/register" component={OrderRegister} isPrivate />
      <Route path="/order/edit" component={OrderEdit} isPrivate />

      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliveryman/register"
        component={DeliverymanRegister}
        isPrivate
      />
      <Route path="/deliveryman/edit" component={DeliverymanEdit} isPrivate />

      <Route path="/recipient" exact component={Recipient} isPrivate />
      <Route
        path="/recipient/register"
        component={RecipientRegister}
        isPrivate
      />
      <Route path="/recipient/edit" component={RecipientEdit} isPrivate />

      <Route path="/" component={() => <h1>Error 404</h1>} />
    </Switch>
  );
}
