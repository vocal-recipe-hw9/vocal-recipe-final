import Grid from "@mui/material/Grid";
import Recipe from "./recipe";
import MDBox from "../../components/MDBox";

// eslint-disable-next-line react/prop-types
function RecipeList({ recipeData }) {
  return (
    <MDBox mt={8}>
      <MDBox mb={3}>
        <section className="results">
          <Grid container spacing={3} direction="row">
            {/* eslint-disable-next-line react/prop-types */}
            {recipeData.results.map((recipe) => (
              <Recipe key={recipe.id} recipe={recipe} />
            ))}
          </Grid>
        </section>
      </MDBox>
    </MDBox>
  );
}

export default RecipeList;
