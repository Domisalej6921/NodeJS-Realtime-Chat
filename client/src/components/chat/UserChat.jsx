import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import male_avatar from "../../assets/male_avatar.svg";

const UserChat = ({chat, user}) => {

  const { recipientUser } = useFetchRecipientUser(chat, user);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={male_avatar} height="35px" />
        </div>
        <div className="text-content">
          <div className="name">{ recipientUser?.name }</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          16/12/2024
        </div>
        <div className="this-user-notifications">
          2
        </div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
};

export default UserChat;