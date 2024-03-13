<!-- Javascript -->
        var letters = ["F", "A", "I", "R", "E", "P"]
        var fscore, ascore, iscore, rscore, escore, pscore = 0;

        $('document').ready(initialise);

        function initialise() {
            update();
            document.getElementById("texts").style.display = "none"
            document.getElementById("total-score").style.display = "none"
            letters.forEach( function (letter) {document.getElementById(letter + "-advice").style.display = "none"});
            if(!window.print) {document.getElementById("print-button").style.display = "none"}
        }

        function get_value(element) {
            return checked(element) ? parseFloat(document.getElementById(element).value) : 0.0;
        }

        function checked(element) {
            return document.getElementById(element).checked ? 1 : 0;
        }

        function check(element) {
            document.getElementById(element).checked = 1;
        }


        function uncheck(element) {
            document.getElementById(element).checked = 0;
        }

        function show_letter(letter, element, score) {
            document.getElementById(("image-" + letter).toLowerCase()).src = "images/print/blue/" + letter + "_" + Math.floor(Math.round(score) / 10) * 10 + ".jpg"
            show_score(letter, element, score);
            show_total_score();
        }

        function show_score(letter, element, score) {
            var advice = document.getElementById(letter + "-advice")
            advice.style.display = "block";
            tail = Math.round(score) < 100.0 ? "% Want to improve?" : "% Well done!"
            $("#" + element).html(Math.round(score) + tail);

            var l = letter.toLowerCase();
            if (l =="f") {fscore = score;} else if (l =="a") {ascore = score;} else if (l =="i") {iscore = score;} else if (l =="r") {rscore = score;} else if (l =="e") {escore = score;} else if (l =="p") {pscore = score;}
        }

        function show_total_score() {
            var total_score = Math.round(((fscore + ascore + iscore + rscore + escore + pscore) / 6));
            $("#total-score-percent").html(" " + total_score + "% ");
            document.getElementById("total-score").style.display = "block"
        }

        function write_to_modal(title, contents) {
            $("#modal-title").html(title);
            $("#modal-body").html(contents);
        }

        function show_modal(id_prefix) {
            var title = document.getElementById(id_prefix + "-title").textContent;
            var contents = document.getElementById(id_prefix + "-contents").innerHTML;
            write_to_modal(title, contents);
            $('#modal').modal('show');
        }

        function advice(letter) {
            let {title, contents} = advice_contents(letter)
            write_to_modal(title, contents);
            $('#modal').modal('show');
        }

        function advice_contents(letter) {
            switch (letter) {
                case "F": return advice_F();
                case "A": return advice_A();
                case "I": return advice_I();
                case "R": return advice_R();
                case "E": return advice_E();
                case "P": return advice_P();
            }
        }

        function update() {
            /*
            In all of the following variable names, if there is a prefix of [fair], it stands for
            Findable, Accessible, Interoperable and Reusable respectively.  For example, fscore refers
            to the score for 'Findable'.
            q refers to a question, for example, '#fq1' is a reference to question 1 for Findable.
            */
            update_F();
            update_A();
            update_I();
            update_R();
            update_E();
            update_P();
        }

        /* ----------------------------- F ----------------------------- */
        function update_F() {
            var fscore1 = parseInt($("#fq1").val());
            var fscore2 = get_value("fq2.1") || get_value("fq2.2") || get_value("fq2.3");
            if (fscore2 > 0) { uncheck("fq2.4")}
            var fscore3 = get_value("fq3.1") + get_value("fq3.2") + get_value("fq3.3");
            var fscore4 = get_value("fq4.1") + get_value("fq4.2") + Math.max(get_value("fq4.3"), get_value("fq4.4"), get_value("fq4.5"))+ get_value("fq4.6");
            if (fscore4 > 0) { uncheck("fq4.6")}
            var f_1_sel = document.getElementById("fq1").selectedIndex;
            if (f_1_sel == 3 && (fscore2 > 0 || fscore3 > 0)) {
                if (fscore2 > 0) { fscore2 = 0; uncheck("fq2.1"); uncheck("fq2.2"); uncheck("fq2.3") };
                if (fscore3 > 0) { fscore3 = 0; uncheck("fq3.1"); uncheck("fq3.2"); uncheck("fq3.3") };
                show_modal('F-i-contradiction')
             }
            fscore2 += get_value("fq2.4")
            var fscore = fscore1 + fscore2 + fscore3 + fscore4;
            show_letter("F", "fscore", fscore)
        }

        function advice_F() {
            var title = document.getElementById("F-advice-title").textContent;
            var q_1_sel = document.getElementById("fq1").selectedIndex;
            var a_1 = document.getElementById("F-advice-1." + q_1_sel).innerHTML;
            var a_2 = document.getElementById("F-advice-2." + checked("fq2.1") + "-" + checked("fq2.2") + "-" + checked("fq2.3")).innerHTML;
            var a_3 = document.getElementById("F-advice-3." + checked("fq3.1") + "-" + checked("fq3.2") + "-" + checked("fq3.3")).innerHTML;
            var a_4 = document.getElementById("F-advice-4").innerHTML;
            var contents = a_1 + "<br><br>" + a_2 + "<br><br>" + a_3 + "<br><br>" + a_4;
            return {title, contents};
        }

        /* ----------------------------- A ----------------------------- */
        function update_A() {
            var ascore1 = get_value("aq1.1") + get_value("aq1.2") + get_value("aq1.3");
            var ascore2 = get_value("aq2.1") + get_value("aq2.2");
            var ascore3 = get_value("aq3.1") + get_value("aq3.2");
            var ascore4 = parseInt($("#aq4").val());
            var q_4_sel = document.getElementById("aq4").selectedIndex;
            if (checked("aq2.1") && q_4_sel == 0) {
                show_modal('A-i-contradiction');
                ascore4 = 0;
                document.getElementById("aq4").selectedIndex = 5;
            }
            var ascore = ascore1 + ascore2 + ascore3 + ascore4;
            show_letter("A", "ascore", ascore);
        }

        function advice_A() {
            var title = document.getElementById("A-advice-title").textContent;
            var a_1 = document.getElementById("A-advice-1." + checked("aq1.1") + "-" + checked("aq1.2") + "-" + checked("aq1.3")).innerHTML;
            var a_2 = "";
            var q_4_sel = document.getElementById("aq4").selectedIndex;
            var a_3 = document.getElementById("A-advice-3").innerHTML;
            var a_4 = document.getElementById("A-advice-4." + q_4_sel).innerHTML;
            var contents = a_1 + "<br><br>" + a_3 + "<br><br>" + a_4;
            return {title, contents};
        }

        /* ----------------------------- I ----------------------------- */
        function update_I() {
            var iscore1 = parseInt($("#iq1").val());
            var iscore2 = parseInt($("#iq2").val());
            var iscore3 = get_value("iq3.1") + get_value("iq3.2") + get_value("iq3.3");
            if (iscore3 > 0) { uncheck("iq3.4")}
            var iscore = iscore1 + iscore2 + iscore3;
            show_letter("I", "iscore", iscore);
        }

        function advice_I() {
            var title = document.getElementById("I-advice-title").textContent;
            var q_1_sel = document.getElementById("iq1").selectedIndex;
            var q_2_sel = document.getElementById("iq2").selectedIndex;
            var a_1 = document.getElementById("I-advice-1." + q_1_sel).innerHTML;
            var a_2 = document.getElementById("I-advice-2." + q_2_sel).innerHTML;
            var a_3 = document.getElementById("I-advice-3." + checked("iq3.1") + "-" + checked("iq3.2") + "-" + checked("iq3.3")).innerHTML;
            var contents = a_1 + "<br><br>" + a_2 + "<br><br>" + a_3;
            return {title, contents};
        }

        /* ----------------------------- R ----------------------------- */
        function update_R() {
            var rscore1 = get_value("rq1.1") + get_value("rq1.2") + get_value("rq1.3") + get_value("rq1.4") + get_value("rq1.5");
            var rscore3 = parseInt($("#rq3").val());
            var rscore4 = parseInt($("#rq4").val());
            var rscore5 = get_value("rq5.1") + get_value("rq5.2") + get_value("rq5.3") + get_value("rq5.4") + get_value("rq5.5") + get_value("rq5.6") + get_value("rq5.7") + get_value("rq5.8") + get_value("rq5.9") + get_value("rq5.10") + get_value("rq5.11") + get_value("rq5.12") + get_value("rq5.13");
            if (rscore5 > 0) { uncheck("rq5.14")}
            var rscore = rscore1 + rscore3 + rscore4 + rscore5;
            show_letter("R", "rscore", rscore);
        }

        function advice_R() {
            var title = document.getElementById("R-advice-title").textContent;
            var a_1 = document.getElementById("R-advice-1").innerHTML;
            var q_3_sel = document.getElementById("rq3").selectedIndex;
            var a_3 = document.getElementById("R-advice-3." + q_3_sel).innerHTML;
            var a_4 = document.getElementById("R-advice-4").innerHTML;
            var contents = a_1 + "<br><br>" + a_3 + "<br><br>" + a_4;
            return {title, contents};
        }

        /* ----------------------------- E ----------------------------- */
        function update_E() {
            var escore1 = parseInt($("#eq1").val());
            if (checked("eq2.2") || checked("eq2.3") || checked("eq2.4") || checked("eq2.5") || checked("eq2.6")) {check("eq2.1")}
            if (checked("eq2.1")) {uncheck("eq2.7")}
            var escore2 = get_value("eq2.1") + get_value("eq2.2") + get_value("eq2.3") + get_value("eq2.4") + get_value("eq2.5") + get_value("eq2.6") + get_value("eq2.7") + get_value("eq2.8");
            if (escore2 > 0) {uncheck("eq2.8")}
            var escore3 = parseInt($("#eq3").val());
            var escore4 = parseInt($("#eq4").val());
            var escore = escore1 + escore2 + escore3 + escore4;
            show_letter("E", "escore", escore);
        }

        function advice_E() {
            var title = document.getElementById("E-advice-title").textContent;
            var a_1 = document.getElementById("E-advice-1").innerHTML;
            var a_2 = document.getElementById("E-advice-2").innerHTML;
            var a_3 = document.getElementById("E-advice-3").innerHTML;
            var a_4 = document.getElementById("E-advice-4").innerHTML;
            var contents = a_1 + "<br><br>" + a_2 + "<br><br>" + a_3 + "<br><br>" + a_4;
            return {title, contents};
        }

        /* ----------------------------- P ----------------------------- */
        function update_P() {
            if(checked("pq1.2") + checked("pq1.3") + checked("pq1.4") + checked("pq1.5") > 1) {
                uncheck("pq1.1");
                uncheck("pq1.2");
                uncheck("pq1.3");
                uncheck("pq1.4");
                uncheck("pq1.5");
                show_modal('P-i-1-contradiction');
            }
            if (checked("pq1.2") || checked("pq1.3") || checked("pq1.4") || checked("pq1.5")) {check("pq1.1")}
            pscore1 = get_value("pq1.2") + get_value("pq1.3") + get_value("pq1.4") + get_value("pq1.5") + get_value("pq1.6");
            if(pscore1 > 0) {uncheck("pq1.7")}
            pscore2 = get_value("pq2.1") + get_value("pq2.2") + get_value("pq2.3") + get_value("pq2.4") + get_value("pq2.5") + get_value("pq2.6");
            if(pscore2 > 0) {uncheck("pq2.7")}
            var pscore3 = get_value("pq3.1");
            var pscore4 = parseInt($("#pq4").val());
            var pscore5 = parseInt($("#pq5").val());
            var pscore6 = parseInt($("#pq6").val());
            var pscore = pscore1 + pscore2 + pscore3 + pscore4 + pscore5 + pscore6;
            show_letter("P", "pscore", pscore);
        }

        function advice_P() {
            var title = document.getElementById("P-advice-title").textContent;
            var a_1 = document.getElementById("P-advice-1").innerHTML;
            var a_2 = document.getElementById("P-advice-2").innerHTML;
            var a_3 = document.getElementById("P-advice-3").innerHTML;
            var a_4 = document.getElementById("P-advice-4").innerHTML;
            var a_5 = document.getElementById("P-advice-5").innerHTML;
            var a_6 = document.getElementById("P-advice-6").innerHTML;
            var contents = a_1 + "<br><br>" + a_2 + "<br><br>" + a_3 + "<br><br>" + a_4  + "<br><br>" + a_5  + "<br><br>" + a_6;
            return {title, contents};
        }

        /* ----------------------------- Checklist ----------------------------- */

        function update_checklist() {
            let totalScore = 0;

            // Get the checklist division by ID
            const checklist = document.getElementById("checklist-table");

            // Find all radio buttons within the checklist division
            const radioButtons = checklist.querySelectorAll('input[type="radio"]');

            // Loop through radio buttons
            radioButtons.forEach(radioButton => {
                // Check if the radio button is checked
                if (radioButton.checked) {
                    // Add the value of the checked radio button to the total score
                    totalScore += parseInt(radioButton.value);
                }
            });
            // Update the total score or perform any other actions with it
            $("#checklist-score").html("Total Score: " + Math.round((totalScore / 124)*100) + "%")
        }

        /* ---------------------------- Print --------------------------- */
        function add_letter_advice(letter) {
            document.getElementById(letter + "-advice").style.display = "none"
            let {title, contents} = advice_contents(letter)
            $("#" + letter + "-print-advice-title").html(title);
            $("#" + letter + "-print-advice-contents").html(contents);
        }

        function print_page() {
            letters.forEach(add_letter_advice);
            document.getElementById("print-button").style.display = "none"
            document.getElementById("print-advice").style.display = "block"
            window.print();
            document.getElementById("print-button").style.display = "block"
            document.getElementById("print-advice").style.display = "none"
            update();
        }