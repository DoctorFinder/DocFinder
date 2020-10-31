using DocFinder.Service.Config;
using DocFinder.Service.Interfaces;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;

namespace DocFinder.Service.ApplicationService
{
    public class EmailApplicationService : IEmailApplicationService
    {
        private ILogger<EmailApplicationService> _emailApplicationService { get; set; }
        private EmailConfiguration _emailConfig { get; set; }
        public EmailApplicationService(EmailConfiguration emailConfig, ILogger<EmailApplicationService> emailApplicationService)
        {
            this._emailConfig = emailConfig;
            this._emailApplicationService = emailApplicationService;
        }
        public void SendPasswordResetEmail(string resetToken, string emailAddress)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(MailboxAddress.Parse(_emailConfig.From));
            emailMessage.To.Add(MailboxAddress.Parse(emailAddress));
            emailMessage.Subject = "Password Reset Link";
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = "You requested for an email reset link" };
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.UserName, _emailConfig.Password);
                    client.Send(emailMessage);
                }
                catch
                {
                    //log an error message or throw an exception or both.
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }

            }
        }

        public void AccountActivatedEmail(string emailAddress)
        {

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(MailboxAddress.Parse(_emailConfig.From));
            emailMessage.To.Add(MailboxAddress.Parse(emailAddress));
            emailMessage.Subject = "Account Activated";
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = "Successfully activated account" };
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_emailConfig.UserName, _emailConfig.Password);
                    client.Send(emailMessage);
                }
                catch
                {
                    //log an error message or throw an exception or both.
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }

}