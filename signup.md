---
layout: page
title: Sign Up
permalink: /signup/
---

We can get you up and running with your own data store in just a few days. Choose a price plan, fill out the form below and we'll be back in touch with your login details and chosen payment method.

## Your Details

<form action="https://formspree.io/martin@datahatch.co.uk"
      method="POST">
    <label for="name">Name</label>
    <input type="text" name="name">
    <label for="organisation">Organisation</label>
    <input type="text" name="organisation">
    <label for="_replyto">Email</label>
    <input type="email" name="_replyto">
    <label for="priceplan">Price Plan</label>
    <select name="priceplan">
  <option value="free">Free</option>
  <option value="basic">Shared</option>
  <option value="mid">Branded</option>
  <option value="heavy">Fronted</option>
</select>
        <label for="subdomain">Preferred Sudomain (Branded and Fronted Price Plans). e.g. you.thedata.place</label>
    <input type="text" name="subdomain">
            <label for="domain">Your Domain (Heavy Price Plan). You must already own this.</label>
    <input type="text" name="domain">
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