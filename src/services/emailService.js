import nodemailer from 'nodemailer';

let sendEmail = async(data) =>{
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
    
      auth: {
        user: process.env.EMAIL_APP, // generated ethereal user
        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"${data.UserName} 👻" <dothienbinh13@gmail.com>`, // sender address
      to: data.listMail, // list of receivers
      subject: data.Name, // Subject line
      html: `
      <h3>Xin chao Admin</h3>
      <p>mot ta cong viec: ${data.Desc}</p>
      <div><b>tien do cong viec: ${data.StatusDesc}</b></div>
      `, // html body
    }, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('send mail sussecc !!');
        }
    });

}

module.exports = {
    sendEmail:sendEmail,
}



