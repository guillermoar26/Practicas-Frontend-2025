import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { CharacterAPI } from "../../types.ts";

export const handler: Handlers = {
  async GET(req: Request, ctx: FreshContext<unknown, CharacterAPI>) {
    try {
      const url = new URL(req.url);
      const name = url.searchParams.get("name") || "";
      const character = await Axios.get<{
        results: CharacterAPI[];
      }>(
        `https://swapi.dev/api/people/?search=${name}&format=json`,
      );

      const characterData = character.data.results;
      return ctx.render(characterData[0]);
    } catch (error) {
      console.log(error);
      throw new Error("Oops, there was a mistake");
    }
  },
};

export default function Page(props: PageProps<CharacterAPI>) {
  try {
    const character = props.data;
    return (
      <div className="containerCharacter">
        <div className="containerCard">
        <h1>{character.name}</h1>
        <ul>
          <li>
            <strong>Height 📏: </strong>
            &nbsp;{character.height} cm.
          </li>
          <li>
            <strong>Mass 🎚️: </strong>
            &nbsp;{character.mass} kg.
          </li>
          <li>
            <strong>Hair Color 💇‍♂️:</strong>
            &nbsp;{character.hair_color}
          </li>
          <li>
            <strong>Skin Color 🎨:</strong>
            &nbsp;{character.skin_color}
          </li>
          <li>
            <strong>Eye Color 👁️: </strong>
            &nbsp;{character.eye_color}
          </li>
          <li>
            <strong>Birth Year 🗓️:</strong>
            &nbsp;{character.birth_year}
          </li>
          <li>
            <strong>Gender 👤:</strong>
            &nbsp;{character.gender}
          </li>
          <li>
            <strong>Homeworld 🪐:</strong>
            <br /><a href={character.homeworld}>{character.homeworld}</a>
          </li>
          {character.films.length > 0 && (
            <li>
              <strong>Films 📼: </strong>
              {character.films.map((film) => (
                <a href={film} key={film}>
                  <br />
                  {film}
                </a>
              ))}
            </li>
          )}
          {character.species.length > 0 && (
            <li>
              <strong>Species 👽:</strong>
              {character.species.map((specie) => (
                <a href={specie} key={specie}>
                  <br />
                  {specie}
                </a>
              ))}
            </li>
          )}
          {character.starships.length > 0 && (
            <li>
              <strong>Starships 🚀: </strong>
              {character.starships.map((starship) => (
                <a href={starship} key={starship}>
                  <br />
                  {starship}
                </a>
              ))}
            </li>
          )}
          {character.vehicles.length > 0 && (
            <li>
              <strong>Vehicles 🚗: </strong>
              {character.vehicles.map((vehicle) => (
                <a href={vehicle} key={vehicle}>
                  <br />
                  {vehicle}
                </a>
              ))}
            </li>
          )}
        </ul>
        <a className="button-back" href="/">Back</a>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="containerError">
        <div className="containerBackground">
        <p>❌ I have a bad feeling about this... Character not found!</p>
        <a className="button-back" href="/">Back</a>
        </div>
      </div>
    );
  }
} 