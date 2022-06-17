(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("level3",
{ "compressionlevel":-1,
 "height":24,
 "infinite":false,
 "layers":[
        {
         "data":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
            67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
            100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123,
            133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156,
            166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189,
            199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222,
            232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255,
            265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288,
            298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321,
            331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354,
            364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387,
            397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420,
            430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453,
            463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486,
            496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519,
            529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552,
            562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585,
            595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618,
            628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651,
            661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684,
            694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717,
            727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750,
            760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783],
         "height":24,
         "id":3,
         "name":"Background",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":24,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 842, 842, 842, 842, 842, 842, 842, 842, 0, 0, 0, 0, 842,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 0, 0, 0, 0, 842,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 842, 842, 842, 842, 842,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 0, 0, 0, 0, 842,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 842, 842, 842, 842, 842, 842, 0, 0, 0, 0, 842,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 842, 842, 842, 842, 842, 842, 842, 0, 0, 0, 0, 0, 842,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 842, 842, 842, 842, 842, 0, 0, 0, 0, 0, 0, 842,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842,
            842, 842, 842, 842, 842, 842, 842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 842, 842, 842, 842, 842, 842,
            842, 0, 842, 842, 842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 842, 842,
            842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842,
            842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842,
            842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842,
            842, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 842,
            842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842, 842],
         "height":24,
         "id":1,
         "name":"Floor",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":24,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 1049, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 1079, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1049, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 1053, 1079, 1079, 1079, 1080, 1079, 1079, 1079, 1080, 1079, 1079, 1079, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1079, 1079, 1079, 1079, 1079, 1079, 1080, 1079, 1079, 1079, 0, 0, 1079, 1079, 1079, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 1069, 1079, 1079, 1079, 1079, 0, 0, 0, 0, 0, 0, 1079, 1079, 1080, 1079, 852,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 1070, 0, 1079, 1079, 1079, 852,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1069, 1079, 1079, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1079, 1079, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1079, 1079, 1079, 1070, 0, 0, 0, 0, 0, 1049, 1079, 1079, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1079, 1079, 1079, 0, 0, 0, 0, 1049, 1079, 1079, 1079, 1079, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1079, 1079, 1079, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1079, 0, 0, 0, 1079, 1070, 0, 0, 0, 1049, 1079, 1079, 1079, 0, 0, 0, 1069, 1079, 1079, 1079, 0, 0, 0,
            0, 1079, 1078, 1079, 1079, 1079, 0, 0, 0, 1049, 1079, 1079, 1079, 1079, 1050, 0, 0, 1073, 1069, 1079, 1079, 1079, 1079, 0,
            0, 1078, 1078, 1079, 1079, 1070, 0, 0, 1049, 1079, 1079, 1079, 1079, 1079, 1079, 1052, 1073, 1079, 1079, 1079, 1079, 1078, 1079, 0,
            0, 1079, 1079, 1079, 1079, 0, 0, 1053, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 1078, 1079, 1079, 1078, 1079, 0,
            0, 1079, 1079, 1079, 1079, 1050, 0, 1049, 1079, 1079, 1079, 1079, 1080, 1079, 1079, 1079, 1079, 1079, 1079, 1079, 1078, 1079, 1079, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":24,
         "id":8,
         "name":"Decoration Background",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":24,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":4,
         "name":"Goal",
         "objects":[
                {
                 "gid":1093,
                 "height":90,
                 "id":1,
                 "name":"Bandage",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":90,
                 "x":40.7208,
                 "y":932.901
                }],
         "opacity":1,
         "properties":[
                {
                 "name":"class",
                 "type":"string",
                 "value":"Goal"
                }],
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 905, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852, 906, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852, 852, 852, 853, 852, 852, 852, 852, 852, 852, 852, 852, 852, 1006,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852, 852, 852, 852, 852, 852, 852, 853, 852, 852, 853, 852, 852, 985,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 853, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852, 852, 853, 853, 852, 852,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852, 852, 852, 852, 852, 852,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852, 852, 0, 0, 0, 852,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 883, 852, 852, 852, 852, 852, 852, 926, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 883, 852, 852, 852, 852, 852, 852, 852, 0, 0, 0, 0, 0, 852,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 925, 852, 852, 852, 852, 852, 852, 926, 0, 0, 0, 0, 0, 852,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852,
            0, 885, 0, 885, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852, 0, 0, 0, 985, 0, 0, 0, 0, 0, 852,
            852, 846, 0, 0, 852, 852, 883, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1005, 852, 852, 852, 852, 852, 852, 852,
            852, 925, 852, 852, 852, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 925, 852, 852, 852,
            852, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852,
            852, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852,
            852, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852,
            852, 906, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 852,
            852, 852, 852, 852, 852, 852, 940, 837, 847, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852, 852],
         "height":24,
         "id":7,
         "name":"Decoration",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":24,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":5,
         "name":"Wall",
         "objects":[
                {
                 "gid":1181,
                 "height":120,
                 "id":2,
                 "name":"W1",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":60.3,
                 "x":779.85,
                 "y":1140
                }, 
                {
                 "gid":1181,
                 "height":60,
                 "id":3,
                 "name":"W2",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":60.3,
                 "x":779.85,
                 "y":960
                }, 
                {
                 "gid":1181,
                 "height":60,
                 "id":4,
                 "name":"W3",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":60.01,
                 "x":1020,
                 "y":1020
                }, 
                {
                 "gid":1181,
                 "height":60,
                 "id":5,
                 "name":"W4",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":60.01,
                 "x":1020,
                 "y":780
                }, 
                {
                 "gid":1200,
                 "height":420,
                 "id":10,
                 "name":"W5",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":60,
                 "x":1379.99,
                 "y":600
                }],
         "opacity":1,
         "properties":[
                {
                 "name":"class",
                 "type":"string",
                 "value":"Wall"
                }],
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":6,
         "name":"Enemy",
         "objects":[
                {
                 "gid":1087,
                 "height":60,
                 "id":6,
                 "name":"Saw1",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":60,
                 "x":390,
                 "y":1000
                }, 
                {
                 "gid":1087,
                 "height":60,
                 "id":7,
                 "name":"Saw2",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":60,
                 "x":570,
                 "y":750
                }, 
                {
                 "gid":1087,
                 "height":60,
                 "id":8,
                 "name":"Saw3",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":60,
                 "x":690,
                 "y":630
                }, 
                {
                 "gid":1087,
                 "height":60,
                 "id":12,
                 "name":"Saw4",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":60,
                 "x":1350,
                 "y":990
                }, 
                {
                 "gid":1087,
                 "height":60,
                 "id":13,
                 "name":"Saw5",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":60,
                 "x":780,
                 "y":1230
                }],
         "opacity":1,
         "properties":[
                {
                 "name":"class",
                 "type":"string",
                 "value":"Enemy"
                }],
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }, 
        {
         "data":[826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":24,
         "id":2,
         "name":"Meat",
         "opacity":1,
         "properties":[
                {
                 "name":"class",
                 "type":"string",
                 "value":"MeatBoy"
                }],
         "type":"tilelayer",
         "visible":false,
         "width":24,
         "x":0,
         "y":0
        }],
 "nextlayerid":9,
 "nextobjectid":14,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.8.4",
 "tileheight":60,
 "tilesets":[
        {
         "columns":33,
         "firstgid":1,
         "image":"maps\/Tilesets\/bg_base.png",
         "imageheight":1500,
         "imagewidth":2000,
         "margin":0,
         "name":"Background",
         "objectalignment":"topleft",
         "spacing":0,
         "tilecount":825,
         "tileheight":60,
         "tilewidth":60
        }, 
        {
         "columns":11,
         "firstgid":826,
         "image":"maps\/Tilesets\/smb.png",
         "imageheight":60,
         "imagewidth":660,
         "margin":0,
         "name":"smb",
         "objectalignment":"topleft",
         "spacing":0,
         "tilecount":11,
         "tileheight":60,
         "tilewidth":60
        }, 
        {
         "columns":20,
         "firstgid":837,
         "image":"maps\/Tilesets\/Tilsetv1.png",
         "imageheight":1200,
         "imagewidth":1200,
         "margin":0,
         "name":"Tileset",
         "objectalignment":"topleft",
         "spacing":0,
         "tilecount":400,
         "tileheight":60,
         "tilewidth":60
        }],
 "tilewidth":60,
 "type":"map",
 "version":"1.8",
 "width":24
});