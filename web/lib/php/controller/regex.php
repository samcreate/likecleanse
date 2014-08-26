<?php

switch (URI_PART_1)
{
    case 'test1':
        $title = 'Test 1';
        $content = "This is the regex controller. You're looking at the test 1 page.";
    break;
    case 'test2':
        $title = 'Test 2';
        $content = "This is the regex controller. You're looking at the test 2 page.";
    break;
    case 'test3':
        $title = 'Test 3';
        $content = "This is the regex controller. You're looking at the test 3 page.";
    break;
}

$head['title'] = 'Regex &mdash; '.$title;

include DIR_VIEW.'/index.php';

?>
