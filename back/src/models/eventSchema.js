const eventSchema = new mongoose.Schema({
    title: String,
    start: String,
    end: String,
});
const Event = mongoose.model("Event", eventSchema);