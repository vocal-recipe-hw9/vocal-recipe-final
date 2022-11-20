/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
// import MDTypography from "components/MDTypography";
import Console from "Console";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
// import DataTable from "examples/Tables/DataTable";

// Data
import RecipeList from "./recipeList";

function Tables() {
  const [recipeData, setRecipeData] = useState(null);
  const [inputData, setInputData] = useState("");
  const [selection, setSelection] = useState("");

  const searchRef = useRef(null);

  const onValueChange = (val) => {
    setSelection(val);
  };

  const onInputChange = (val) => {
    setInputData(val);
  };

  const getRecipeData = () => {
    if (selection === "name") {
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=ecb1f2a12d6a4fb1942aa1d3703eaea6&query=${inputData}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRecipeData(data);
        })
        .catch(() => {
          Console.log("error");
        });
    } else {
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=ecb1f2a12d6a4fb1942aa1d3703eaea6&query=${""}&includeIngredients=${inputData}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRecipeData(data);
        })
        .catch(() => {
          Console.log("error");
        });
    }
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) getRecipeData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={3}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue="name"
            id="radio"
            onChange={(e) => {
              onValueChange(e.target.value);
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Search By:&nbsp;&nbsp;&nbsp;&nbsp;
            <FormControlLabel value="name" control={<Radio />} label="Name" />
            <FormControlLabel value="ingredient" control={<Radio />} label="Ingredient" />
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={3}>
          <TextField
            inputRef={searchRef}
            sx={{ width: 250 }}
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => {
              onInputChange(e.target.value);
            }}
          />
          <Button variant="contained" onClick={getRecipeData} onLoadStart={getRecipeData}>
            Search
          </Button>
        </Grid>
      </Grid>
      {recipeData && <RecipeList recipeData={recipeData} />}
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
