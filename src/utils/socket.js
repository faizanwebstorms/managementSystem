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
      const senderUser = await User.findOne({ _id: data?.logedInUserId });
      console.log("senderUser", senderUser);
      // const allDeposits = await depositService.getAllDeposits({});
      /// sending deposits to concerned persons
      // io.to(deposit?.recieverId).emit("allDeposits", allDeposits);
      io.to([
        deposit?.recieverId,
        deposit?.senderId,
        senderUser?.id,
        senderUser?._id,
      ]).emit("newDeposit", deposit);
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
