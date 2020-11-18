<?
/**
 * Třída reprezentuje typ obsahu - Přehled podstránek
 * @see model_Content
 * @package content
 */
 
class content_OverviewBoilers extends content_Overview {
    
    public function __construct()
    {   
    	parent::__construct();
    	$this->allowablePages = array(
    		'Boiler'
    	);
    	
    	$this->userName = 'Přehled kotlů';
    	    	
    	foreach($this->properties as $property) {
			if ($property->name == "pathToTemplate"){
				$property->value = 'Boilers';
			}
		} 		       
    }
    
    function show($view, $node){    	
    	$template = $this->getPropertyByName('pathToTemplate')->value . '.phtml';
    	$view->content = $this; 
    	$view->node = $node;
    	
    	$view->pageText = $view->content->getPropertyValue('html');    	
    	$view->children = $node->getChildren();
    	return $view->render(Zend_Registry::getInstance()->config->view->overviewsDir . $template);    	 
    }
}
?>
