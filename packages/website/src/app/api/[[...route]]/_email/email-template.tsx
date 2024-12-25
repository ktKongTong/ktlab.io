interface EmailTemplateProps {
  name: string,
  content: string,
  url: string
  title: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  content,
  url,
  title
}) => (
  <div>
    <h1>Hi, {name}!</h1>
    <div>You have receive a comment in document: <a href={url}>{title}</a></div>
    <div>{content}</div>
  </div>
);

