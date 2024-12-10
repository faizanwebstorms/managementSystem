// eslint-disable-next-line import/no-extraneous-dependencies
const socketIO = require("socket.io");
const { api } = require("../config/messages");
const { depositService } = require("../services");
const { User } = require("../models");

const socketConnection = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
    addTrailingSlash: false,
  });
  io.on("connection", async (socket) => {
    console.log("A client connected:", socket.id);

    // create deposit
    socket.on("new-deposit", async (data) => {
      const deposit = await depositService.addDeposit(data);
      console.log("deposit", deposit);
      if (!deposit) {
        return socket.emit("error", { error: api.internalServerError });
      }
      console.log("data?.logedInUserId", data?.logedInUserId);
      const senderUser = await User.findOne({ _id: data?.logedInUserId });
      console.log("senderUser", senderUser);
      // const allDeposits = await depositService.getAllDeposits({});
      /// sending deposits to concerned persons
      // io.to(deposit?.recieverId).emit("allDeposits", allDeposits);
      // socket.emit("newDeposit", deposit); // Receiver
      io.to("672e05607f762523835d1f01").emit("newDeposit", deposit); // Sender
      io.to(senderUser?.id).emit("newDeposit", deposit); // Logged-in user
      io.to(senderUser?._id.toString()).emit("newDeposit", deposit);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });
  });
  return io;
};

module.exports = {
  socketConnection,
};
