let sortingInProgress = false;
generateBars(50);

function stopSorting() {
  sortingInProgress = false;
}

// generate random integers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate bars
function generateBars(size) {
  const barsContainer = document.getElementById("bars-container");
  barsContainer.textContent = "";

  for (let i = 0; i < size; i++) {
    const barHeight = getRandomInt(50, 300);
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${barHeight}px`;
    barsContainer.appendChild(bar);
  }
}

function changeSize() {
  const newSize = prompt("Enter new size:");
  generateBars(parseInt(newSize, 10) || 10);
}

// randomize the bars
function randomizeArray() {
  sortingInProgress = false;
  generateBars(50);
}

// swap two bars
function swapBars(bar1, bar2) {
  const tempHeight = bar1.style.height;
  bar1.style.height = bar2.style.height;
  bar2.style.height = tempHeight;
}

// Insertion Sort
async function insertionSort() {
  if (sortingInProgress) return;

  sortingInProgress = true;

  const barsContainer = document.getElementById("bars-container");
  const bars = barsContainer.childNodes;

  const n = bars.length;

  for (let i = 1; i < n; i++) {
    if (!sortingInProgress) return;

    const keyHeight = parseInt(bars[i].style.height);
    let j = i - 1;

    bars[i].style.backgroundColor = "#e74c3c";

    await new Promise((resolve) => setTimeout(resolve, 100));

    while (j >= 0 && parseInt(bars[j].style.height) > keyHeight) {
      swapBars(bars[j], bars[j + 1]);
      j--;

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    bars[j + 1].style.height = `${keyHeight}px`;

    // Reset bar color
    for (let k = i; k >= 0; k--) {
      bars[k].style.backgroundColor = "#3498db";
    }
  }

  sortingInProgress = false;
}

// Selection Sort
async function selectionSort() {
  if (sortingInProgress) return;

  sortingInProgress = true;

  const barsContainer = document.getElementById("bars-container");
  const bars = barsContainer.childNodes;

  const n = bars.length;

  for (let i = 0; i < n - 1; i++) {
    if (!sortingInProgress) return;

    let minIndex = i;

    bars[minIndex].style.backgroundColor = "#e74c3c";

    await new Promise((resolve) => setTimeout(resolve, 100));

    for (let j = i + 1; j < n; j++) {
      if (!sortingInProgress) return;
      bars[j].style.backgroundColor = "#e74c3c";

      await new Promise((resolve) => setTimeout(resolve, 100));

      const minHeight = parseInt(bars[minIndex].style.height);
      const currentHeight = parseInt(bars[j].style.height);

      if (currentHeight < minHeight) {
        bars[minIndex].style.backgroundColor = "#3498db";
        minIndex = j;
        bars[minIndex].style.backgroundColor = "#e74c3c";
      } else {
        bars[j].style.backgroundColor = "#3498db";
      }
    }

    swapBars(bars[i], bars[minIndex]);

    bars[i].style.backgroundColor = "#2ecc71";
    bars[minIndex].style.backgroundColor = "#3498db";
  }

  if (!sortingInProgress) return;
  for (let i = 0; i < n; i++) {
    bars[i].style.backgroundColor = "#2ecc71";
  }

  sortingInProgress = false;
}

// Bubble Sort
async function bubbleSort() {
  if (sortingInProgress) return;

  sortingInProgress = true;
  const barsContainer = document.getElementById("bars-container");
  const bars = barsContainer.childNodes;

  const n = bars.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (!sortingInProgress) {
        bars[j].style.backgroundColor = "#3498db";
        bars[j + 1].style.backgroundColor = "#3498db";
        return;
      }

      // Highlight bars being compared
      bars[j].style.backgroundColor = "#e74c3c";
      bars[j + 1].style.backgroundColor = "#e74c3c";

      await new Promise((resolve) => setTimeout(resolve, 100));

      const height1 = parseInt(bars[j].style.height);
      const height2 = parseInt(bars[j + 1].style.height);

      if (height1 > height2) {
        swapBars(bars[j], bars[j + 1]);
      }

      bars[j].style.backgroundColor = "#3498db";
      bars[j + 1].style.backgroundColor = "#3498db";
    }

    bars[n - i - 1].style.backgroundColor = "#2ecc71";
  }

  bars[0].style.backgroundColor = "#2ecc71";
  sortingInProgress = false;
}

// Shell Sort
async function shellSort() {
  if (sortingInProgress) return;

  sortingInProgress = true;

  const barsContainer = document.getElementById("bars-container");
  const bars = barsContainer.childNodes;

  const n = bars.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      if (!sortingInProgress) return;

      const currentHeight = parseInt(bars[i].style.height);
      let j = i;

      bars[i].style.backgroundColor = "#e74c3c";

      await new Promise((resolve) => setTimeout(resolve, 100));

      while (j >= gap && parseInt(bars[j - gap].style.height) > currentHeight) {
        swapBars(bars[j], bars[j - gap]);

        j -= gap;

        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      bars[j].style.height = `${currentHeight}px`;

      bars[i].style.backgroundColor = "#3498db";
    }
  }

  for (let i = 0; i < n; i++) {
    bars[i].style.backgroundColor = "#2ecc71";
  }

  sortingInProgress = false;
}

// Merge Sort
async function merge(bars, low, mid, high) {
  if (!sortingInProgress) return;
  const n1 = mid - low + 1;
  const n2 = high - mid;

  const leftArray = new Array(n1);
  const rightArray = new Array(n2);

  // Copy data to temporary arrays
  for (let i = 0; i < n1; i++) {
    leftArray[i] = parseInt(bars[low + i].style.height);
    bars[low + i].style.backgroundColor = "#e74c3c";
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  for (let j = 0; j < n2; j++) {
    rightArray[j] = parseInt(bars[mid + 1 + j].style.height);
    bars[mid + 1 + j].style.backgroundColor = "#3498db";
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  let i = 0;
  let j = 0;
  let k = low;

  while (i < n1 && j < n2) {
    if (!sortingInProgress) return;

    if (leftArray[i] <= rightArray[j]) {
      bars[k].style.height = `${leftArray[i]}px`;
      i++;
    } else {
      bars[k].style.height = `${rightArray[j]}px`;
      j++;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    bars[k].style.backgroundColor = "#2ecc71";

    k++;
  }

  while (i < n1) {
    if (!sortingInProgress) return;

    bars[k].style.height = `${leftArray[i]}px`;
    await new Promise((resolve) => setTimeout(resolve, 100));

    bars[k].style.backgroundColor = "#2ecc71";

    i++;
    k++;
  }

  while (j < n2) {
    if (!sortingInProgress) return;

    bars[k].style.height = `${rightArray[j]}px`;
    await new Promise((resolve) => setTimeout(resolve, 100));

    bars[k].style.backgroundColor = "#2ecc71";

    j++;
    k++;
  }
}

async function mergeSortUtil(bars, low, high) {
  if (!sortingInProgress) return;
  if (low < high) {
    const mid = Math.floor((low + high) / 2);

    await mergeSortUtil(bars, low, mid);
    await mergeSortUtil(bars, mid + 1, high);

    await merge(bars, low, mid, high);
  }
}

async function mergeSort() {
  if (sortingInProgress) return;
  sortingInProgress = true;

  const barsContainer = document.getElementById("bars-container");
  const bars = barsContainer.childNodes;

  if (!sortingInProgress) return;
  await mergeSortUtil(bars, 0, bars.length - 1);

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "#2ecc71";
  }

  sortingInProgress = false;
}

// Quick Sort
async function quickSort() {
  if (sortingInProgress) return;

  sortingInProgress = true;

  const barsContainer = document.getElementById("bars-container");
  const bars = barsContainer.childNodes;

  await quickSortUtil(bars, 0, bars.length - 1);

  if (!sortingInProgress) return;
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "#2ecc71";
  }

  sortingInProgress = false;
}

async function partition(bars, low, high) {
  const pivotHeight = parseInt(bars[high].style.height);
  let i = low - 1;

  bars[high].style.backgroundColor = "#e74c3c";

  await new Promise((resolve) => setTimeout(resolve, 100));

  for (let j = low; j < high; j++) {
    if (!sortingInProgress) return;

    const currentHeight = parseInt(bars[j].style.height);

    bars[j].style.backgroundColor = "#e74c3c";

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (currentHeight < pivotHeight) {
      i++;
      swapBars(bars[i], bars[j]);
    }

    bars[j].style.backgroundColor = "#3498db";
  }

  swapBars(bars[i + 1], bars[high]);

  bars[high].style.backgroundColor = "#3498db";

  return i + 1;
}

async function quickSortUtil(bars, low, high) {
  if (low < high) {
    if (!sortingInProgress) return;

    const partitionIndex = await partition(bars, low, high);

    await quickSortUtil(bars, low, partitionIndex - 1);
    await quickSortUtil(bars, partitionIndex + 1, high);
  }
}
