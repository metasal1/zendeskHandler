const axios = require("axios");

exports.handler = async (context, event, callback) => {
  // create a payload
  let comment = `{
    "ticket": {
      "comment": {
        "html_body": "<b>To</b> ${event.To}<br><b>From</b> ${event.From}<br><b>Status</b> ${event.MessageStatus}</br><b>SID</b> ${event.MessageSid}<br>",
        "public": false,
        "via": {
          "channel": 57
        }
      }
    }
  }`;
  // create ticket comment in Zendesk

  let headersList = {
    Accept: "*/*",
    Authorization: `Basic ${context.ZENDESK_TOKEN}`,
    "Content-Type": "application/json",
  };
  let reqOptions = {
    url: `https://${context.ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets/${event.id}.json`,
    method: "PUT",
    headers: headersList,
    data: comment,
  };
  var response = await axios
    .request(reqOptions)
    .then(function (response) {
      // console.log(response.data);
    })
    .then((message) => {
      console.log(response);
      callback(null, response);
    })
    .catch((error) => {
      console.log(error);
      callback(error);
    });
  // tell user all good
};
