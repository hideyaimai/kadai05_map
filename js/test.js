
let playerhands = "";
let computerhands = "";
let result = "";
let wins = "";
let pokemonImages = {}; // ポケモンの画像URLを保持するためのオブジェクト

// computerhandsをランダムに変更します。
$(".pickgu,.pickchoki,.pickpa").on("click", function () {
    let random = Math.floor(Math.random() * 3);
    if (random === 0) {
        computerhands = "グー";
    } else if (random === 1) {
        computerhands = "チョキ";
    } else if (random === 2) {
        computerhands = "パー";
    }
});

// 以下3つはplayerhandsを変更します。
$(".pickgu").on("click", function () {
    playerhands = "グー";
    $(".pickgu").css("background-color", "rgba(237, 202, 196, 0.4)")
    $(".pickchoki").css("background-color", "");
    $(".pickpa").css("background-color", "");
});

$(".pickchoki").on("click", function () {
    playerhands = "チョキ";
    $(".pickgu").css("background-color", "")
    $(".pickchoki").css("background-color", "rgba(237, 202, 196, 0.4)");
    $(".pickpa").css("background-color", "");
});

$(".pickpa").on("click", function () {
    playerhands = "パー";
    $(".pickgu").css("background-color", "")
    $(".pickchoki").css("background-color", "");
    $(".pickpa").css("background-color", "rgba(237, 202, 196, 0.4)");
});

// 以下3つはresultを変更します。
$(".pickpa").on("click", function () {
    if (computerhands === "グー") {
        result = "勝ち"
    } else if (computerhands === "チョキ") {
        result = "負け"
    } else {
        result = "あいこ"
    }
});

$(".pickgu").on("click", function () {
    if (computerhands === "グー") {
        result = "あいこ"
    } else if (computerhands === "チョキ") {
        result = "勝ち"
    } else {
        result = "負け"
    }
});

$(".pickchoki").on("click", function () {
    if (computerhands === "グー") {
        result = "負け"
    } else if (computerhands === "チョキ") {
        result = "あいこ"
    } else {
        result = "勝ち"
    }
});

// 確定ボタンでhandsとresult変数を画面に反映します。
$(".confirmbutton").on("click", function () {
    setTimeout(function () {
        $(".resulttext").html("勝負！")
    }, 500);

    setTimeout(function () {
        // 自身の手をポケモン画像に変更
        if (playerhands === "グー") {
            $(".myhandpicture").attr("src", pokemonImages[3]);
        } else if (playerhands === "チョキ") {
            $(".myhandpicture").attr("src", pokemonImages[6]);
        } else {
            $(".myhandpicture").attr("src", pokemonImages[9]);
        }

        // コンピューターの手をポケモン画像に変更
        if (computerhands === "グー") {
            $(".enemyhandpicture").attr("src", pokemonImages[3]);
        } else if (computerhands === "チョキ") {
            $(".enemyhandpicture").attr("src", pokemonImages[6]);
        } else {
            $(".enemyhandpicture").attr("src", pokemonImages[9]);
        }
    }, 1500);

    setTimeout(function () {
        if (result === "勝ち") {
            $(".resulttext").html("勝ち").css("text-shadow", "0 0 20px red, 0 0 20px red, 0 0 30px red, 0 0 30px red");     
        } else if (result === "あいこ") {   
            $(".resulttext").html("あいこ").css("text-shadow", "0 0 20px white, 0 0 20px red, 0 0 30px white, 0 0 30px white");
        } else {
            $(".resulttext").html("負け").css("text-shadow", "0 0 20px blue, 0 0 20px blue, 0 0 30px blue, 0 0 30px blue");
        }
    }, 2500);

    setTimeout(function () {
        $(".resulttext").html("手を選択").css("text-shadow", "");
        $(".myhandpicture").attr("src", "img/door.jpeg");
        $(".enemyhandpicture").attr("src", "img/door.jpeg");
        $(".pickgu").css("background-color", "")
        $(".pickchoki").css("background-color", "");
        $(".pickpa").css("background-color", "");
    }, 5000);
});

const pokemonNum = 9;

const fetchPokemons = async () => {
    for (let i = 3; i <= pokemonNum; i = i + 3) {
    await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    creatPokemon(pokemon);
};

function creatPokemon(pokemon) {
    pokemonImages[pokemon.id] = pokemon.sprites.front_default;
let className;
    switch (pokemon.id) {
        case 3:
            className = 'pickgu';
        break;
        case 6:
            className = 'pickchoki';
        break;
        case 9:
            className = 'pickpa';
        break;
}

const poke =`
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="${className}">
    `;

    $(".handchoice").append(poke);
}

fetchPokemons();
