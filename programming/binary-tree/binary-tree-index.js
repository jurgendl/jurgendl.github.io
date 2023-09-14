import { Node, BinaryTree } from "./binary-tree.js";

function rnd(max) {
    return Math.floor(Math.random() * max);
}

if (true) {
    let tree1 = new BinaryTree();
    let generationCount = 20;
    let upperBound = 50;
    let indexToDelete = rnd(generationCount);
    let nodeToDelete;
    let valuesUnordered = "";
    for (let i = 0; i < generationCount; i++) {
        const nr = rnd(upperBound);
        const newNode = tree1.insert(nr);
        if (i == indexToDelete) {
            nodeToDelete = newNode;
        }
        valuesUnordered += '<span class="badge badge-pill badge-secondary mark-' + nr + '">' + nr + "</span>" + " ";
    }

    const style = document.createElement("style");
    style.id = "style-" + nodeToDelete.key;
    style.textContent = ".mark-" + nodeToDelete.key + "{background-color: mediumslateblue !important;}";
    document.head.appendChild(style);

    document.getElementById('valuesUnordered').innerHTML = "random: " + valuesUnordered;

    visualize(tree1, "before_", nodeToDelete);

    console.log('search', tree1.search(nodeToDelete.key));

    let tree2 = tree1.duplicate();

    document.getElementById('between').innerHTML = "delete: " + '<span class="badge badge-pill badge-secondary mark-' + nodeToDelete.key + '">' + nodeToDelete.key + "</span>";

    tree2.delete(nodeToDelete.key);

    visualize(tree2, "after_", nodeToDelete);

    console.log('search', tree2.search(nodeToDelete.key));

    let tree3 = tree2.duplicate().balance();

    visualize(tree3, "balanced_", nodeToDelete);

    function visualize(bst, id, marker) {
        function convert(n) {
            const o = { value: n.key };
            if (n.left || n.right) {
                o.children = [];
                if (n.left) {
                    const s = convert(n.left);
                    s.color = "crimson";
                    o.children.push(s);
                }
                if (n.right) {
                    const s = convert(n.right);
                    s.color = "steelblue";
                    o.children.push(s);
                }
            }
            return o;
        }

        const btsArr = bst.toArray();

        const info = {
            length: btsArr.length,
            height: bst.height(),
            min: bst.min().key,
            max: bst.max().key
        };
        document.getElementById(id + 'height').innerHTML = JSON.stringify(info);

        document.getElementById(id + 'ordered').innerHTML = "ordered: " + btsArr.map(n => '<span class="badge badge-pill badge-secondary mark-' + n.key + '">' + n.key + '</span>').join(" ");

        const treeData = convert(bst.root);

        // set the dimensions and margins of the diagram
        const margin = { top: 20, right: 20, bottom: 20, left: 20 },
            width = 1000 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        // declares a tree layout and assigns the size
        const treemap = d3.tree().size([height, width]);

        //  assigns the data to a hierarchy using parent-child relationships
        let nodes = d3.hierarchy(treeData, d => d.children);

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        const svg = d3.select('#' + id + 'treeView').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // adds the links between the nodes
        const link = g.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .style("stroke", d => d.data.color)
            .attr("d", d => {
                return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            });

        // adds each node as a group
        const node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", d => {
                let c = "node";
                if (marker.key == d.data.value) {
                    c += " node--delete";
                }
                if (d.children) {
                    c += " node--internal";
                } else {
                    c += " node--leaf";
                }
                return c;
            })
            .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

        // adds the circle to the node
        node.append("circle")
            //.attr("r", d => d.data.value)
            .attr("r", d => 14)
            .style("stroke", d => d.data.color)
            //.style("fill", d => d.data.color)
            ;

        // adds the text to the node
        node.append("text")
            // .attr("dy", ".35em")
            .attr("x", d => 0)
            .attr("y", d => 5)
            .style("text-anchor", d => "middle")//https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
            .style("stroke", d => d.data.color)
            .text(d => d.data.value);
    }
}