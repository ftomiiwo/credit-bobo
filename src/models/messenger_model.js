const request = require('request');
const appConfig = require('../../config/app_config');

/*
 * Call the Send API. The message data goes in the body. If successful, we'll
 * get the message id in a response
 */
function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: appConfig.MESSENGER.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData,

  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const recipientId = body.recipient_id;
      const messageId = body.message_id;

      if (messageId) {
        console.log('Successfully sent message with id %s to recipient %s',
          messageId, recipientId);
      } else {
        console.log('Successfully called Send API for recipient %s',
          recipientId);
      }
    } else {
      console.error('Failed calling Send API', response.statusCode, response.statusMessage, body.error);
    }
  });
}

/*
 * Send a text message using the Send API.
 */
function sendTextMessage(recipientId, messageText) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
      metadata: 'DEVELOPER_DEFINED_METADATA',
    },
  };

  callSendAPI(messageData);
}

function sendHiMessage(recipientId) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: `
Congrats on setting up your Messenger Bot!

Right now, your bot can only respond to a few words. Try out "quick reply", "typing on", "button", or "image" to see how they work. You'll find a complete list of these commands in the "app.js" file. Anything else you type will just be mirrored until you create additional commands.

For more details on how to create commands, go to https://developers.facebook.com/docs/messenger-platform/reference/send-api.
      `,
    },
  };

  callSendAPI(messageData);
}

/*
 * Send an image using the Send API.
 */
function sendImageMessage(recipientId) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: `${appConfig.MESSENGER.SERVER_URL}/assets/rift.png`,
        },
      },
    },
  };

  callSendAPI(messageData);
}

/*
 * Send a Gif using the Send API.
 */
function sendGifMessage(recipientId) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: `${appConfig.MESSENGER.SERVER_URL}/assets/instagram_logo.gif`,
        },
      },
    },
  };

  callSendAPI(messageData);
}

/*
 * Send audio using the Send API.
 */
function sendAudioMessage(recipientId) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'audio',
        payload: {
          url: `${appConfig.MESSENGER.SERVER_URL}/assets/sample.mp3`,
        },
      },
    },
  };

  callSendAPI(messageData);
}

/*
 * Send a video using the Send API.
 */
function sendVideoMessage(recipientId) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'video',
        payload: {
          url: `${appConfig.MESSENGER.SERVER_URL}/assets/allofus480.mov`,
        },
      },
    },
  };

  callSendAPI(messageData);
}

/*
 * Send a file using the Send API.
 */
function sendFileMessage(recipientId) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'file',
        payload: {
          url: `${appConfig.MESSENGER.SERVER_URL}/assets/test.txt`,
        },
      },
    },
  };

  callSendAPI(messageData);
}

/*
 * Send a button message using the Send API.
 */
function sendButtonMessage(recipientId) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'This is test text',
          buttons: [{
            type: 'web_url',
            url: 'https://www.oculus.com/en-us/rift/',
            title: 'Open Web URL',
          }, {
            type: 'postback',
            title: 'Trigger Postback',
            payload: 'DEVELOPER_DEFINED_PAYLOAD',
          }, {
            type: 'phone_number',
            title: 'Call Phone Number',
            payload: '+16505551234',
          }],
        },
      },
    },
  };

  callSendAPI(messageData);
}

/*
 * Send a Structured Message (Generic Message type) using the Send API.
 */
function sendGenericMessage(recipientId) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: 'rift',
            subtitle: 'Next-generation virtual reality',
            item_url: 'https://www.oculus.com/en-us/rift/',
            image_url: `${appConfig.MESSENGER.SERVER_URL}/assets/rift.png`,
            buttons: [{
              type: 'web_url',
              url: 'https://www.oculus.com/en-us/rift/',
              title: 'Open Web URL',
            }, {
              type: 'postback',
              title: 'Call Postback',
              payload: 'Payload for first bubble',
            }],
          }, {
            title: 'touch',
            subtitle: 'Your Hands, Now in VR',
            item_url: 'https://www.oculus.com/en-us/touch/',
            image_url: `${appConfig.MESSENGER.SERVER_URL}/assets/touch.png`,
            buttons: [{
              type: 'web_url',
              url: 'https://www.oculus.com/en-us/touch/',
              title: 'Open Web URL',
            }, {
              type: 'postback',
              title: 'Call Postback',
              payload: 'Payload for second bubble',
            }],
          }],
        },
      },
    },
  };

  callSendAPI(messageData);
}

/*
 * Send a receipt message using the Send API.
 */
function sendReceiptMessage(recipientId) {
  // Generate a random receipt ID as the API requires a unique ID
  const receiptId = `order${Math.floor(Math.random() * 1000)}`;

  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'receipt',
          recipient_name: 'Peter Chang',
          order_number: receiptId,
          currency: 'USD',
          payment_method: 'Visa 1234',
          timestamp: '1428444852',
          elements: [{
            title: 'Oculus Rift',
            subtitle: 'Includes: headset, sensor, remote',
            quantity: 1,
            price: 599.00,
            currency: 'USD',
            image_url: `${appConfig.MESSENGER.SERVER_URL}/assets/riftsq.png`,
          }, {
            title: 'Samsung Gear VR',
            subtitle: 'Frost White',
            quantity: 1,
            price: 99.99,
            currency: 'USD',
            image_url: `${appConfig.MESSENGER.SERVER_URL}/assets/gearvrsq.png`,
          }],
          address: {
            street_1: '1 Hacker Way',
            street_2: '',
            city: 'Menlo Park',
            postal_code: '94025',
            state: 'CA',
            country: 'US',
          },
          summary: {
            subtotal: 698.99,
            shipping_cost: 20.00,
            total_tax: 57.67,
            total_cost: 626.66,
          },
          adjustments: [{
            name: 'New Customer Discount',
            amount: -50,
          }, {
            name: '$100 Off Coupon',
            amount: -100,
          }],
        },
      },
    },
  };

  callSendAPI(messageData);
}

/*
 * Send a message with Quick Reply buttons.
 */
function sendQuickReply(recipientId) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: "What's your favorite movie genre?",
      quick_replies: [
        {
          content_type: 'text',
          title: 'Action',
          payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION',
        },
        {
          content_type: 'text',
          title: 'Comedy',
          payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY',
        },
        {
          content_type: 'text',
          title: 'Drama',
          payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA',
        },
      ],
    },
  };

  callSendAPI(messageData);
}

/*
 * Send a read receipt to indicate the message has been read
 */
function sendReadReceipt(recipientId) {
  console.log('Sending a read receipt to mark message as seen');

  const messageData = {
    recipient: {
      id: recipientId,
    },
    sender_action: 'mark_seen',
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator on
 */
function sendTypingOn(recipientId) {
  console.log('Turning typing indicator on');

  const messageData = {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_on',
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator off
 */
function sendTypingOff(recipientId) {
  console.log('Turning typing indicator off');

  const messageData = {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_off',
  };

  callSendAPI(messageData);
}

/*
 * Send a message with the account linking call-to-action
 */
function sendAccountLinking(recipientId) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Welcome. Link your account.',
          buttons: [{
            type: 'account_link',
            url: `${appConfig.MESSENGER.SERVER_URL}/authorize`,
          }],
        },
      },
    },
  };

  callSendAPI(messageData);
}

module.exports = {
  sendAccountLinking,
  sendAudioMessage,
  sendButtonMessage,
  sendFileMessage,
  sendGenericMessage,
  sendGifMessage,
  sendHiMessage,
  sendImageMessage,
  sendQuickReply,
  sendReadReceipt,
  sendReceiptMessage,
  sendTextMessage,
  sendTypingOff,
  sendTypingOn,
  sendVideoMessage,
  callSendAPI,
};
