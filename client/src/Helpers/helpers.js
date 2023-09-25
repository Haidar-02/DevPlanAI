function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function formatDateToView(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-200";
    case "Late":
      return "bg-red-200";
    case "Done":
      return "bg-green-200";
    default:
      return "";
  }
};
export { stringAvatar, formatDateToView, getStatusColor };
