import got_him from "/KWS2100-lecture-05/got_him.mp3";

export function SoundButton() {
    return (
        <button
            onClick={() => {
                new Audio(got_him).play();
            }}
            className="btn btn-outline-secondary btn-sm"
        >
            Got him!
        </button>
    );
}
