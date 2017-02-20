---
layout: page
title: Sign Up
permalink: /signup/
---

We can get you up and running with your own data store in under 48 hours. Just choose a price plan, fill out the form below and we'll be back in touch with your login details and chosen payment method.

## Your Details

<form action="https://formspree.io/mistergough@gmail.com"
      method="POST">
    <label for="name">Name</label>
    <input type="text" name="name">
    <label for="organisation">Organisation</label>
    <input type="text" name="organisation">
    <label for="_replyto">Email</label>
    <input type="email" name="_replyto">
    <label for="username">Preferred Username</label>
    <input type="text" name="username">
        <label for="subdomain">Preferred Sudomain (Mid Price Plan). e.g. you.thedata.place</label>
    <input type="text" name="subdomain">
            <label for="domain">Your Domain (Heavy Price Plan). You must already own this.</label>
    <input type="text" name="domain">
    <label for="priceplan">Price Plan</label>
    <select name="priceplan">
  <option value="free">Free</option>
  <option value="basic">Basic</option>
  <option value="mid">Mid</option>
  <option value="heavy">Heavy</option>
</select>
    <label for="paymentmethod">Payment Method</label>
    <select name="paymentmethod">
  <option value="notapplicable">Not Applicable</option>
  <option value="cardmonthly">Card/Monthly</option>
  <option value="cardannual">Card/Annual</option>
  <option value="purchaseorder">Purchase Order</option>
</select>
    <label for="message">Optional Message</label>
    <textarea name="message"></textarea>
    <input class="button" type="submit" value="Send">
</form>