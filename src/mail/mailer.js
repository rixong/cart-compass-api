const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const templates = {
  share_notification: 'd-38f4883e308045648b05424bd28ee2f1',
};

function sendEmail(data) {
  const msg = {
    to: data.receiver,
    from: 'rick@rickglascock.com',
    templateId: templates[data.template],

    dynamic_template_data: {
      name: data.name,
      listName: data.listName,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Message sent');
    })
    .catch((e) => {
      console.log('An error occured', e);
    });
}

exports.sendEmail = sendEmail;
