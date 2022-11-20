import { useState, useEffect } from "react";
import Console from "Console";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { CardContent, CardMedia } from "@mui/material";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";

// eslint-disable-next-line react/prop-types
function Recipe({ recipe }) {
  const [imageUrl, setImageUrl] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  useEffect(() => {
    fetch(
      // eslint-disable-next-line react/prop-types
      `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=ecb1f2a12d6a4fb1942aa1d3703eaea6&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        Console.log("error");
      });
    // eslint-disable-next-line react/prop-types
  }, [recipe.id]);

  useEffect(() => {
    fetch(
      // eslint-disable-next-line react/prop-types
      `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=ecb1f2a12d6a4fb1942aa1d3703eaea6&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setSourceUrl(data.spoonacularSourceUrl);
      })
      .catch(() => {
        Console.log("error");
      });
    // eslint-disable-next-line react/prop-types
  }, [recipe.id]);

  return (
    <Grid item md={3}>
      <Card>
        <MDBox pt={3} px={3}>
          <MDTypography variant="h6" fontWeight="medium">
            {/* eslint-disable-next-line react/prop-types */}
            {recipe.title}
          </MDTypography>
        </MDBox>
        <CardMedia component="img" height="300" src={imageUrl} alt="recipe" />
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          className="instructions"
          p={0}
          m={0}
        >
          <CardContent>
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {/* eslint-disable-next-line react/prop-types */}
              <a href={sourceUrl}>Go to Recipe</a>
            </MDTypography>
          </CardContent>
        </MDBox>
      </Card>
    </Grid>
  );
}

export default Recipe;
